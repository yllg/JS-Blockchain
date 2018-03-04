
const WebScoket = require("ws");
const p2p_port = process.env.P2P_PORT || 6000;

let sockets;
/**
 * 添加其他服务到peer
 */
const connectToPeer = (newPeers)=>{
    newPeers.forEach((peer) => {
        //地址，启动另一个服务
        const ws = new WebScoket(peer);

        //给app.js发送一个消息，拿到最新的块，再广播一遍
        //ws.send(new Block);
        ws.on('open',()=>initConnection(ws));
        ws.on('error',()=>{
            console.log("connection failed");
        });
    });
};

/** 
 * server之间可以互相send消息，叫广播，
*/
const initConnection = (ws)=>{
    if(sockets.length < 1000){
        sockets.push(ws);
    }else{
        //peer
    }
    initMessageHandler(ws);
}

/** 
 * 消息处理
*/
const initMessageHandler = (ws)=>{
    ws.on("message",(data)=>{
        const message = JSON.parse(data);
    });
};

/** 
 * 主服务
*/
const initP2PServer = ()=>{
    const server = new WebScoket.Server({port:p2p_port});
    server.on("connection",ws=>initConnection(ws));
    console.log(`p2p server start on ${p2p_port}`);
}

initP2PServer();



