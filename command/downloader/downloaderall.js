const yts = require('yt-search')

module.exports = {
    name: "downloaderall",
    alias: ["ytmp3", "ytmp4", "play", "tiktokaudio", "tiktok", "fbdl", "fb", "soundcloud", "facebook"],
    use: "<url>",
    category: "downloader",
    desc: "Download audio/video from Facebook, Imgur, SoundCloud, Tiktok, dan YouTube",
    wait: true,
    query: true,
    isSpam: true,
    async run(msg, conn, q, isOwner, body, map, config, args) {
        var pilih = msg.body.split(/ +/)[0].slice(1)
        var teks = args[0]
        if (pilih == "play") {
            yets = await yts(args[0]);
            var results = await yets.all.filter((s) => s.type == "video");
            var vid = results.find((video) => video.seconds < 3600);
            teks = vid.url
        }
        var yt = await rzky.downloader.downloaderAll(teks);
        if (pilih == "downloaderall") return msg.reply("Silahkan Pilih Downloader: ytmp3,ytmp4,play,tiktok,soundcloud,facebook")
        var mp3 = yt.mp3[yt.mp3.length - 1]
        var mp4 = yt.mp4[yt.mp4.length - 1]
        var img = yt.image;
        var audio = yt.result;
        yt.size_audio = mp3 ? mp3.formattedSize : ''
        yt.size_video = mp4 ? mp4.formattedSize : ''
        delete yt.image;
        delete yt.mp4;
        delete yt.mp3;
        delete yt.status;
        var result = await rzky.tools.parseResult(yt, {
            title: "Downloader"
        });
        switch (pilih) {
            case 'ytmp3':
            case 'play':
                await conn.sendFile(msg.from, img, "yt.jpg", result.replace(/downloader_from/gi, 'Downloader From'), msg);
                await conn.sendMessage(msg.from, {
                    audio: {
                        url: mp3.url
                    },
                    mimetype: "audio/mpeg",
                    fileName: yt.title + ".mp3"
                }, {
                    quoted: msg
                })
                break

            case 'ytmp4':
                await conn.sendMessage(msg.from, {
                    video: {
                        url: mp4.url
                    },
                    mimetype: "video/mp4",
                    caption: result.replace(/downloader_from/gi, 'Downloader From'),
                    fileName: yt.title + ".mp4"
                }, {
                    quoted: msg
                })
                break
            case 'facebook':
            case 'fb':
            case 'fbdl':
                await conn.sendMessage(msg.from, {
                    video: {
                        url: mp4.url
                    },
                    mimetype: "video/mp4",
                    caption: result.replace(/downloader_from/gi, 'Downloader From'),
                    fileName: "facebook.mp4"
                }, {
                    quoted: msg
                })
                break
            case 'soundcloud':
                await conn.sendFile(msg.from, img, "yt.jpg", result.replace(/downloader_from/gi, 'Downloader From'), msg);
                await conn.sendMessage(msg.from, {
                    audio: {
                        url: mp3.url
                    },
                    mimetype: "audio/mpeg",
                    fileName: yt.title + ".mp3"
                }, {
                    quoted: msg
                })
                break
            case 'tiktok':
                await conn.sendMessage(msg.from, {
                    video: {
                        url: mp4.url
                    },
                    caption: result.replace(/downloader_from/gi, 'Downloader From'),
                    mimetype: "video/mp4",
                    fileName: yt.title.substr(0, 19) + ".mp4"
                }, {
                    quoted: msg
                })
                break
            case 'tiktokaudio':
                await conn.sendFile(msg.from, img, "yt.jpg", result.replace(/downloader_from/gi, 'Downloader From'), msg);
                await conn.sendMessage(msg.from, {
                    audio: {
                        url: mp3.url
                    },
                    mimetype: "audio/mpeg",
                    fileName: yt.title.substr(0, 19) + ".mp3"
                }, {
                    quoted: msg
                })
                break
        }
    },
};
