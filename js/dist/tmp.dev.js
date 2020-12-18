"use strict";

function quota(params) {
  var _quota, percentageUsed, remaining;

  return regeneratorRuntime.async(function quota$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(navigator.storage && navigator.storage.estimate)) {
            _context.next = 8;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(navigator.storage.estimate());

        case 3:
          _quota = _context.sent;
          // quota.usage -> Number of bytes used.
          // quota.quota -> Maximum number of bytes available.
          percentageUsed = _quota.usage / _quota.quota * 100;
          console.log("You've used ".concat(percentageUsed, "% of the available storage."));
          remaining = _quota.quota - _quota.usage;
          console.log("You can write up to ".concat(remaining / 1000000000, " more bytes."));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

quota();