// scripts/fetch-frc-data.js
// Run with: node scripts/fetch-frc-data.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = 'r62LgWN2mtAKvEKQc9EIC9Kzoga2PnkhmzJgyy7v1kEysnADgnmtlltYzTP15drl';

async function fetchFRCData() {
  console.log('Fetching FRC 2026 Championship data...');
  
  const events = [
    '2026arc', // Archimedes
    '2026cars', // Carson
    '2026cur', // Curie
    '2026dal', // Daly
    '2026gal', // Galileo
    '2026hop', // Hopper
    '2026new', // Newton
    '2026roe', // Roebling
    '2026einstein' // Einstein (Championship finals)
  ];

  let teamStats = {}; // { teamKey: { wins, losses, ties } }
  let allMatches = [];

  try {
    for (const eventKey of events) {
      console.log(`Fetching matches from ${eventKey}...`);
      
      const response = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`,
        {
          headers: {
            'X-TBA-Auth-Key': API_KEY
          }
        }
      );

      if (!response.ok) {
        console.warn(`Failed to fetch ${eventKey}: ${response.status}`);
        continue;
      }

      const matches = await response.json();
      allMatches = allMatches.concat(matches);

      // Process matches
      matches.forEach(match => {
        if (match.comp_level === 'qm' && match.alliances && match.winning_alliance) {
          const redTeams = match.alliances.red?.team_keys || [];
          const blueTeams = match.alliances.blue?.team_keys || [];

          // Initialize teams
          [...redTeams, ...blueTeams].forEach(teamKey => {
            if (!teamStats[teamKey]) {
              teamStats[teamKey] = { wins: 0, losses: 0, ties: 0 };
            }
          });

          if (match.winning_alliance === 'red') {
            redTeams.forEach(t => teamStats[t].wins++);
            blueTeams.forEach(t => teamStats[t].losses++);
          } else if (match.winning_alliance === 'blue') {
            blueTeams.forEach(t => teamStats[t].wins++);
            redTeams.forEach(t => teamStats[t].losses++);
          }
        }
      });
    }

    // Create CSV data
    let csvContent = 'team_key,team_number,wins,losses,ties\n';
    
    Object.entries(teamStats).forEach(([teamKey, stats]) => {
      const teamNumber = teamKey.replace('frc', '');
      csvContent += `${teamKey},${teamNumber},${stats.wins},${stats.losses},${stats.ties}\n`;
    });

    // Write to public folder
    const outputPath = path.join(__dirname, '../public/frc_2026_data.csv');
    fs.writeFileSync(outputPath, csvContent);

    console.log(`✓ Data saved to ${outputPath}`);
    console.log(`✓ Total teams: ${Object.keys(teamStats).length}`);
    console.log(`✓ Total matches processed: ${allMatches.length}`);

  } catch (error) {
    console.error('Error fetching FRC data:', error);
    process.exit(1);
  }
}

fetchFRCData();
