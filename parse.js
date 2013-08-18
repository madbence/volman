var spawn = require('child_process').spawn;

module.exports = function(fn) {
  var child = spawn('pactl', ['list']);
  var buffer = '';
  child.stdout.on('data', function(buf) {
    buffer += buf.toString();
  });
  child.on('exit', function() {
    var info = buffer.split('\n').reduce(function(list, line) {
      if(line == '') { return list; }
      if(line[0] == '\t') {
        list[list.length - 1].push(line.substr(1));
      } else {
        list.push([line]);
      }
      return list;
    }, []).filter(function(arr) {
      return arr[0].match(/Sink #\d+/);
    }).reduce(function(list, item) {
      var info = {};
      ['state', 'description', 'name', 'driver'].forEach(function(key) {
        var row = item.filter(function(i) {
          return i.match(new RegExp(key, 'i'));
        })[0];
        info[key] = row.split(':')[1].substr(1);
      });
      info.volume = item.filter(function(i) {
        return i.match(/Volume/);
      })[0].match(/^Volume: 0:\s+(\d+)%\s+\d+:\s+(\d+)%/).slice(1, 3).map(
        function(v) {
          return parseInt(v);
        });
      info.mute = !item.filter(function(i) {
        return i.match(/Mute/);
      })[0].match(/no/);
      list.push(info);
      return list;
    }, []);
    fn(info);
  });
};

