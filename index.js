const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILD_SCHEDULED_EVENTS"]
})


const ytch = require("yt-channel-info")

const ffmpeg = require("ffmpeg")

client.login(process.env.token);

client.on('ready', () =>{
    console.log('Connessione al server...');{
        console.log('Connesso!')
    }

})



//Youtube
client.on("messageCreate", (message) => {
    if (message.content == "!lastvideo") {
        ytch.getChannelVideos("UCtxtpNTf5gsyRh3j-tt9moQ")
            .then(response => {
                var embed = new Discord.MessageEmbed()
                    .setTitle("Last video")
                    .setDescription("Ultimo video uscito sul canale")
                    .addField("Title", response.items[0].title)
                    .addField("Link", "https://www.youtube.com/watch?v=" + response.items[0].videoId)
                    .addField("Views", response.items[0].viewCount.toString())
                    .addField("Duration", response.items[0].durationText)
                    .addField("Published", response.items[0].publishedText)
                    .setImage(response.items[0].videoThumbnails[3].url)

                message.channel.send(embed)
            })
    }
})


//Link
client.on('messageCreate', (message) =>{
    if(message.content === "!link"){
        console.log('Esecuzione in corso...!');
        message.reply('Iscriviti al mio canale YouTube: https://www.youtube.com/c/DanJakyt');
        message.reply('Iscriviti al mio canale Twitch: https://www.twitch.tv/danjakyt/about');
        message.reply('Se vuoi donare me qualche spiccio beh: https://streamelements.com/danielegamer09-79/tip');
        message.reply('Visita anche il mio sito web: https://danjakyt.github.io/Site/');
        message.reply('MyLink: https://danjakyt.github.io/mylink/');
        console.log('Eseguito!');
    }
})





//SCEGLI UNA REAZIONE
client.on("messageCreate", (message) => {
    if (message.content == "!palline") {
        message.channel.send("Scegli il pallino")
            .then(messaggio => {
                messaggio.react("🟢");
                messaggio.react("🟡");
                messaggio.react("🔴");

                var filtro = (reaction, user) => ["🟢", "🔴", "🟡"].includes(reaction.emoji.name) && user.id == message.author.id;

                messaggio.awaitReactions(filtro, { max: 1, time: 5000 })
                    .then(collected => {
                        var reazione = collected.first().emoji.name;
                        if (reazione == "🟢") {
                            message.channel.send("😀");
                        }
                        if (reazione == "🔴") {
                            message.channel.send("😭");
                        }
                        if (reazione == "🟡") {
                            message.channel.send("😕");
                        }

                    }).catch(collected => {
                        return message.channel.send("Tempo scaduto!");
                    })




            })
    }
})






//Benvenuto&Addio

//Benvenuto
client.on("guildMemberAdd", (member) => {
    client.channels.cache.get("833425730540797974").send("Ciao " + member.toString() + "Benvenuto nella centrale nucleare!");
})

//Addio
client.on("guildMemberRemove", (member) => {
    client.channels.cache.get("833425730540797974").send("Ciao ciao" + member.toString() + "torna presto!");
})







//kick&ban

//kick
client.on("messageCreate", message => {
    if (message.content.startsWith("!kick")) {
        var utente = message.mentions.members.first();
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.kickable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.kick()
            .then(() => {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} kickato`)
                    .setDescription(`Utente kickato da ${message.author.toString()}`)

                message.channel.send({ embeds: [embed] })
            })
    }




//ban

    if (message.content.startsWith("!ban")) {
        var utente = message.mentions.members.first();
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.bannable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.ban()
            .then(() => {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} bannato`)
                    .setDescription(`Utente bannato da ${message.author.toString()}`)

                message.channel.send({ embeds: [embed] })
            })
    }

});



//IMMAGINI CRINGE
client.on("messageCreate", (message) => {
    if (message.content == "!tramezzino"){

        message.channel.send("https://cdn.discordapp.com/attachments/931195861994733688/931522445838516264/thumb.php_.jpg")

    }


    if (message.content == "!WHAT"){

        message.channel.send("https://cdn.discordapp.com/attachments/931195861994733688/931522446065041438/IMG_0597.JPG")

    }


    if (message.content == "!BIGnigga"){

        message.channel.send("https://cdn.discordapp.com/attachments/931195861994733688/931522446291529738/20220102_174429.jpg")

    }

});







//INFO
client.on("messageCreate", (message) => {
    if (message.content == "!help"){

        var embed = new Discord.MessageEmbed()
            .setAuthor('Alina Bot', 'https://cdn.discordapp.com/attachments/931195861994733688/931275485554544660/IconaBot.png')
            .setTitle('Lista Comandi')
            .setColor ('#F1C40F')
            .setThumbnail('https://cdn.discordapp.com/attachments/931195861994733688/931275485554544660/IconaBot.png')

            .addField('Prima di ogni comando inserire sempre:', '`"!"`\r')
            


            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '📄 TESTO', value: '`lastvideo` | `link` | `avatar`', inline: true },
                { name: '🎮 GIOCHI', value: '`palline`', inline: true },
                { name: '\u200B', value: '\u200B' }
            )
            

            .addFields(
                { name: '📷 FOTO CRINGE', value:'`tramezzino` | `WHAT` | `BIGnigga`'},
                { name: '\u200B', value: '\u200B' }
            )

            .addFields(
                { name: '🛠️ IMPOSTAZIONI INTERNE', value:'`kick` | `ban` | `channelinfo` | `userinfo` | `ping` ', inline: true},
                { name: '🛠️ IMPOSTAZIONI INTERNE AUTOMATICHE', value:'`benvenuto` | `addio` | `banParolacce` ', inline: true},
                { name: '\u200B', value: '\u200B' }
            )


            .setFooter(' by DanJakyt | VERSIONE: 1.0')
        message.channel.send({embeds: [embed]})


    }
})





//BANPAROLACCE
client.on("messageCreate", message => {
    if (message.channel.type == "DM") return

    if (message.member.roles.cache.has("932042219563663440") || message.member.roles.cache.has("854337787305394176")) return

    var parolacce = ["DIO", "Dio", "dIo", "diO", "DIo", "dIO", "DiO", "dio"]
    var trovata = false;
    var testo = message.content;

    parolacce.forEach(parola => {
        if (message.content.toLowerCase().includes(parola.toLowerCase())) {
            trovata = true;
            testo = testo.replace(eval(`/${parola}/g`), "###");
        }
    })

    if (trovata) {
        message.delete();
        var embed = new Discord.MessageEmbed()
            .setTitle("🔴RISCHIO BAN🔴")
            .setDescription("🔴Hai scritto un messaggio con parole bloccate")

        message.channel.send({ embeds: [embed] })
    }
})






//AVATAR
client.on("messageCreate", message => {
    if (message.content.startsWith("!avatar")) {
        if (message.content.trim() == "!avatar") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Utente non trovato")
        }
        var embed = new Discord.MessageEmbed()
            .setTitle("📸AVATAR📸")
            .setDescription("@" + utente.user.tag)
            .setImage(utente.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 300
            }))
        message.channel.send({ embeds: [embed] })
    }
});





//ChannelInfo
client.on("messageCreate", message => {
    if (message.content.startsWith("!channelinfo")) {
        if (message.content == "!channelinfo") {
            var canale = message.channel;
        }
        else {
            var canale = message.mentions.channels.first();
        }
        if (!canale) {
            return message.channel.send("Canale non trovato");
        }
        switch (canale.type) {
            case "GUILD_TEXT": canale.type = "Text"; break;
            case "GUILD_VOICE": canale.type = "Voice"; break;
            case "GUILD_CATEGORY": canale.type = "Category"; break;
        }
        if (canale.type == "Voice") {
            var embed = new Discord.MessageEmbed()
                .setTitle(canale.name)
                .setDescription("Tutte le statistiche su questo canale")
                .addField("Channel ID", canale.id, true)
                .addField("Type", canale.type, true)
                .addField("Position", canale.rawPosition.toString(), true)
                .addField("Bitrate", canale.bitrate.toString(), true)
                .addField("User limit", canale.userLimit == 0 ? "∞" : canale.userLimit.toString(), true)
            return message.channel.send({ embeds: [embed] })
        }
        if (canale.type == "Category") {
            var embed = new Discord.MessageEmbed()
                .setTitle(canale.name)
                .setDescription("Tutte le statistiche su questa categoria")
                .addField("Category ID", canale.id, true)
                .addField("Type", canale.type, true)
                .addField("Position", canale.rawPosition.toString(), true)
                .addField("Category created", canale.createdAt.toDateString())
            return message.channel.send({ embeds: [embed] })
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(canale.name)
            .setDescription("Tutte le statistiche su questo canale")
            .addField("Channel ID", canale.id, true)
            .addField("Type", canale.type, true)
            .addField("Position", canale.rawPosition.toString(), true)
            .addField("Topic", !canale.topic ? "No topic" : canale.topic, true)
            .addField("NSFW", canale.nsfw ? "Yes" : "No", true)
            .addField("Channel created", canale.createdAt.toDateString())
        message.channel.send({ embeds: [embed] })
    }
});






//userinfo
client.on("messageCreate", message => {
    if (message.content.startsWith("!userinfo")) {
        if (message.content == "!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Non ho trovato questo utente")
        }
        var elencoPermessi = "";
        if (utente.permissions.has("ADMIN")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("User id", utente.user.id, true)
            .addField("Status", utente.presence ? utente.presence.status : "offline", true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "No", true)
            .addField("Account created", utente.user.createdAt.toDateString(), true)
            .addField("Joined this server", utente.joinedAt.toDateString(), true)
            .addField("Permissions", elencoPermessi, false)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
        message.channel.send({ embeds: [embed] })
    }
});







//YOUTUBELASTVIDEONOW
setInterval(() => {
    ytch.getChannelVideos("UCtxtpNTf5gsyRh3j-tt9moQ", "newest").then(async response => {
        var idVideo = response.items[0]?.videoId
        if (!idVideo) return

        client.channels.cache.get("885207812723056680").messages.fetch()
            .then(messages => {
                var giaMandato = false;
                messages.forEach(msg => {
                    if (msg.embeds[0]?.url?.endsWith(idVideo)) giaMandato = true;
                });

                if (!giaMandato) {
                    var embed = new Discord.MessageEmbed()
                        .setTitle("Nuovo video")
                        .setURL(`https://youtu.be/${idVideo}`) //Importante non levarlo
                        .setThumbnail(response.items[0].videoThumbnails[3].url)
                        .setDescription(`Ciao, è appena uscito un video su **${response.items[0].author}**
Andate a vedere "${response.items[0].title}\"
[Ecco il video](https://youtu.be/${idVideo})`)

                    client.channels.cache.get('885207812723056680').send({ embeds: [embed] });
                }
            })
    })
}, 1000 * 30)






//Ping
client.on("messageCreate", message => {
    if (message.content == "!ping") {
        var embed = new Discord.MessageEmbed()
            .setAuthor('Alina Bot', 'https://cdn.discordapp.com/attachments/931195861994733688/931275485554544660/IconaBot.png')
            .setColor("DARK_GOLD")
            .addField("Ping", `${client.ws.ping}ms`)

        message.channel.send({embeds: [embed]})
    }
});
