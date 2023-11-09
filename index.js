const { execSync } = require('child_process');
const fs = require('fs');

function generateRandomDate() {
  // Generate a random date between 2010 and 2025
  const start = new Date(2022, 0, 1); 
  const end = new Date(2025, 0, 1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function createFakeCommit() {
    const randomDate = generateRandomDate();
  
    // Format the date in the required format for Git
    const formattedDate = randomDate.toISOString().slice(0, 19).replace('T', ' ');
  
    // Set the commit date (compatible with Windows)
    const setDateCommand = `set GIT_COMMITTER_DATE="${formattedDate}" && git commit --allow-empty -m "Fake commit on ${formattedDate}" --date "${formattedDate}"`;
  
    // Execute the command
    execSync(setDateCommand, { stdio: 'inherit' });
  
    console.log(`Created commit on: ${formattedDate}`);
  }

function createFakeCommits(num) {
  for (let i = 0; i < num; i++) {
    // Create an empty file to commit or use a real file if you want to simulate real code changes
    fs.writeFileSync('fakefile.txt', `Fake commit #${i}`);

    // Add file to Git staging area
    execSync('git add .');

    // Create the fake commit
    createFakeCommit();
  }
}

// Run the function to create 10 fake commits
createFakeCommits(50);