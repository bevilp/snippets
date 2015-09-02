"use strict";
(function (UTILS) {
    UTILS.setInterval = function (code, delayMilliSeconds, options) {
        //TODO window.setInterval also has window.setInterval(func, delay[, param1, param2, ...]); as a signature. Params are not currently handled. Not needed so not implemented yet

        options = options || {};

        // How long are we going to poll ?
        var maxTotalDelayMilliSeconds = options.maxTotalDelayMilliSeconds;

        // function we are going to execute when the delay is expired
        var onEnd = options.onEnd;

        // since when are we polling
        var pollingSinceMilliseconds = 0;

        // add the polling event to window and retrieve the polling event id needed to stop it later
        var windowPollingIntervalId = window.setInterval(function () {
            // if maxPolling time has been set, time constraint the code argument. Or else run indefinitely
            if (maxTotalDelayMilliSeconds) {
                timeConstrainedInterval();
            } else {
                code();
            }
        }, delayMilliSeconds);

        var timeConstrainedInterval = function timeConstrainedInterval() {
            // check that we haven't been polling for too long
            if (pollingSinceMilliseconds < maxTotalDelayMilliSeconds) {
                code();
                pollingSinceMilliseconds += delayMilliSeconds;
            } else {
                // we have been polling too long. Stop it !
                window.clearInterval(windowPollingIntervalId);

                // if onEnd has been defined, execute it now.
                if (onEnd) {
                    onEnd();
                }
            }
        };
    };
})(window.UTILS = window.UTILS || {});
