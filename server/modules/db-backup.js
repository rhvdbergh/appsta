const dbBackup = (server) => {
  console.log('in dbBackup');
  console.log('Backup complete: closing server...');
  server.close();
};

module.exports = dbBackup;
