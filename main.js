song1 = "";
song2 = "";
song1_status ="";
song2_status ="";


LWY = 0;
LWX = 0;


RWY = 0;
RWX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("its working so pay meeeeeeeeeeeeeeeeeeeeeee");
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        console.log("LeftWristX" + LWX + "Left wrist y" + LWY);
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
        console.log("RightWristX" + RWX + "Right wrist y" + RWY);
    }


}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#ffd9c9");
    stroke("#ffd9c9");
    if (scoreRightWrist > 0.2) {

        circle(RWX, RWY, 20);
        song2.stop();
        if(song1_status == false) {
            document.getElementById("song").innerHTML = "Closer is Playing";
            song1.play();
        }       
    }  

    if (scoreLeftWrist > 0.2) {

        circle(LWX, LWY, 20);
        song1.stop();
        if(song2_status == false) {
            document.getElementById("song").innerHTML = "POP/STARS is Playing";
            song2.play();
        }       
    }  
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}











