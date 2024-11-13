$(document).ready(function() {
    var current_cmd_idxs = {
        "demo": 1,
        "char": 1,
        "graph": 1
    }
    var vid_start_times = {
        "demo": {
            1: 0 * 60 + 0,
            2: 0 * 60 +10,
            3: 0 * 60 +20,
            4: 0 * 60 +31
        },
        "char": {
            1: 0 * 60 + 0,
            2: 0 * 60 + 10,
            3: 0 * 60 + 22,
            4: 0 * 60 + 33
        }
    }

    var vid_end_times = {
        "demo": {
            1: 0 * 60 +10,
            2: 0 * 60 +20,
            3: 0 * 60 +31,
            4: 0 * 60 +41
        },
        "char": {
            1: 0 * 60 + 10,
            2: 0 * 60 + 22,
            3: 0 * 60 + 33,
            4: 0 * 60 + 43
        },
    }
    function playSeg(vid, start_time, end_time, domain_name, desired_cmd_idx) {
        vid.play();
        vid.pause();
        vid.currentTime = start_time;
        setTimeout(function () {
            vid.play();;
            }, 100);
        vid.play();

        // console.log("start and end: " + start_time.toString() + ", " + end_time.toString());

        var pausing_function = function() {
            // console.log("checking pausing function cb for " + domain_name);
            // console.log("current and end time");
            // console.log(this.currentTime);
            // console.log(end_time)
            if (this.currentTime >= end_time) {
                // console.log("reached end time");
                this.pause();
                this.removeEventListener("timeupdate", pausing_function);
            }
        };

        // console.log("adding timeupdate pausing_function for " + domain_name + "_" + desired_cmd_idx.toString());
        vid.addEventListener("timeupdate", pausing_function);
    }
    // demos
    $('select').on('change', function() {
        var sep_idx = this.value.indexOf('_');
        var domain_name = this.value.substring(0, sep_idx);
        var desired_cmd_idx = parseInt(this.value.substring(sep_idx + 1));
        var current_cmd_idx = current_cmd_idxs[domain_name];
        
        // hide current content
        var current_content = $('#content_' + domain_name + "_" + current_cmd_idx.toString());
        current_content.hide();

        // show desired content
        var desired_content = $('#content_' + domain_name + "_" + desired_cmd_idx.toString());
        desired_content.show();
        
        // switch videos
        if (domain_name.startsWith("demo") || domain_name.startsWith("char")) {
            var vid = $("#vid_" + domain_name)[0];
            var start_time = vid_start_times[domain_name][desired_cmd_idx];
            var end_time = vid_end_times[domain_name][desired_cmd_idx];
            playSeg(vid, start_time, end_time, domain_name, desired_cmd_idx);
            // var current_vid = $('#vid_1_' + domain_name + "_" + current_cmd_idx.toString()).get(0);
            // var desired_vid = $('#vid_1_' + domain_name + "_" + desired_cmd_idx.toString()).get(0);
            // current_vid.pause();
            // desired_vid.play();
        } 
        // else {
        //     var vid = $("#vid_" + domain_name)[0];
        //     var start_time = vid_start_times[domain_name][desired_cmd_idx];
        //     var end_time = vid_end_times[domain_name][desired_cmd_idx];
        //     playSeg(vid, start_time, end_time, domain_name, desired_cmd_idx);
        // }
        // set current to desired
        current_cmd_idxs[domain_name] = desired_cmd_idx;
    });
});
