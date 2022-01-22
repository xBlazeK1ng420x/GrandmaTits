const KikClient = require("./src/kikClient.js");

const Kik = new KikClient({
    username: "",
    password: "",
    promptCaptchas: true,
    trackUserInfo: true,
    trackFriendInfo: true
});
Kik.on("authenticated", () => {
    //this is not needed since the client grabs roster automatically once authenticated
    Kik.getRoster((groups, friends) => {
        console.log("We got the roster")
        console.log(groups)
        console.log(friends)
    })
});
//alternatively you can use this event for roster
Kik.on("receivedroster", (groups, friends) => {
    console.log(groups);
    console.log(friends)
});
//alternatively you can use this event for captcha
Kik.on("receivedcaptcha", (captchaUrl) => {
    console.log("Please solve captcha" + captchaUrl)
});
Kik.on("receivedjidinfo", (users) => {
    console.log("We got peer info:");
    console.log(users)
});

/*GROUP EVENTS*/
Kik.on("receivedgroupmsg", (group, sender, msg) => {
    console.log(`GROUP:${group.code}: [${sender.displayName}]: ${msg}`)
});
Kik.on("grouptyping", (group, sender, isTyping) => {
    if(isTyping){
        console.log(`GROUP:${group.code}: ${sender.displayName} is typing...`)
    }else{
        console.log(`GROUP:${group.code}: ${sender.displayName} stopped typing`)
    }
});
Kik.on("userleftgroup", (group, user, kickedBy) => {
    console.log(`GROUP:${group.code}: ${user.displayName} left the group`);
    //ban anyone once they leave
    Kik.setBanned(group.jid, user.jid, true)
});
Kik.on("userjoinedgroup", (group, user, invitedBy) => {
    console.log(`GROUP:${group.code}: ${user.displayName} joined the group`);
    //kicking anyone once they join
    Kik.setGroupMember(group.jid, user.jid, false)
});

/*PRIVATE EVENTS*/
Kik.on("receivedprivatemsg", async (sender, msg) => {
    //  if(sender.jid == "karmenseczi_opt@talk.kik.com"){

    let msgPart =  msg.toString().toLowerCase().split(" ");

    if(msgPart[0] == "hi" && msgPart[1] == "bot" )
    Kik.newStanza(sender.jid, msg, (delivered, read) => {
        if(delivered){
            console.log(`PRIVATE: ${sender.jid} PM read`)
        }else if(read){
            console.log(`PRIVATE: ${sender.jid} PM delivered`)
        }
    });


    if(msgPart[0] == "hi" && msgPart[1] == "hoe" )
    Kik.newnewStanza(sender.jid, msg, (delivered, read) => {
        if(delivered){
            console.log(`PRIVATE: ${sender.jid} PM read`)
        }else if(read){
            console.log(`PRIVATE: ${sender.jid} PM delivered`)
        }
    });

    if(msgPart[0] == "add" && msgPart[1] == "me" )
    Kik.addFriend(sender.jid,);
    Kik.sendMessage(sender.jid, "I added you");

    console.log(`PRIVATE: [${sender.displayName}]: ${msg}`)

    // }
});
Kik.on("privatetyping", (sender, isTyping) => {
    if(isTyping){
        console.log(`PRIVATE: ${sender.jid} is typing`)
    }else{
        console.log(`PRIVATE: ${sender.jid} stopped typing`)
    }
});

Kik.connect();

