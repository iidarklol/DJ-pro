twenty_min="";
Gimme_gimme_song = ""
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_twenty_min = "";
song_Gimme_gimme = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    twenty_min = loadSound("Lil_Uzi_Vert-_20_Min_Instrumental_(getmp3.pro).mp3");
    Gimme_gimme_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_twenty_min = twenty_min.isPlaying();
    console.log(song_twenty_min);

    song_Gimme_gimme = Gimme_gimme_song.isPlaying();
    console.log(song_Gimme_gimme);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Gimme_gimme_song.stop();
        if(song_twenty_min == false){
            twenty_min.play();
        }
        else{
            console.log("Song Name: 20 min");
            document.getElementById("song_id").innerHTML = "Song Name: 20 min";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        twenty_min.stop();
        if(song_Gimme_gimme == false){
            Gimme_gimme_song.play();
        }
        else{
            console.log("Song Name: Gimme gimme");
            document.getElementById("song_id").innerHTML = "Song Name: Gimme gimme";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}