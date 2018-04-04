export default {
  config: {
    aisFeeds: [
      {
        ip: '5.9.207.224',
        port: 6636,
        name: 'Marine Traffic',
        status: 'http://www.marinetraffic.com/ais/details/stations/1316',
      },
      {
        ip: '54.204.25.151',
        port: 7113,
        name: 'Boat Beacon',
        status: 'http://boatbeaconapp.com/station/7113',
      },
      {
        ip: '144.76.105.244',
        port: 2092,
        name: 'AIS Hub',
        status: 'http://www.aishub.net/live-map.php?rrdname=2092&sname=Bayfield',
      },
      {
        ip: '109.200.19.151',
        port: 4001,
        name: 'Ship Finder',
      },
    ],
    udpListen: 10110,
  },
  data: {
  },
}
