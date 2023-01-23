const fs = require('fs');

const filename = `../localFiles/content.txt`;

// TODO: 历史记录存到本地中
const loadContent = async () => {
    return fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '';
}

const saveContent = async (content) => {
    fs.writeFileSync(filename, content, 'utf8');
}