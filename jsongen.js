const fs = require('fs');
const path = require('path');

const categories = [
  'categorya', 'categoryb', 'categoryc', 'categoryd',
  'categorye', 'categoryf', 'categoryg', 'categoryh',
  'categoryi', 'categoryj', 'categoryk', 'categoryl'
];

const output = {};

categories.forEach(category => {
  const dir = path.join(__dirname, 'img', category);
  if (fs.existsSync(dir)) {
    output[category] = fs.readdirSync(dir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  } else {
    output[category] = []; // Initialize empty array for missing folders
  }
});

fs.writeFileSync('data/filelist.json', JSON.stringify(output, null, 2));
console.log('Generated filelist.json with all categories!');