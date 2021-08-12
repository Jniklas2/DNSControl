var cloudflare = NewDnsProvider("cloudflare", "CLOUDFLAREAPI");
var REGISTRAR = NewRegistrar("ThirdParty", "NONE");

DEFAULTS(
  CAA_BUILDER({
    label: "*",
    iodef: "mailto:admin@cxsrv.de",
    issue: ["letsencrypt.org"],
    issuewild: ["letsencrypt.org"],
  }),
  CAA_BUILDER({
    label: "@",
    iodef: "mailto:admin@cxsrv.de",
    issue: ["letsencrypt.org"],
    issuewild: ["letsencrypt.org"],
  }),
  DnsProvider(cloudflare)
);

var MAIL01 = [
  // CNAME
  CNAME("autoconfig", "mail.cxsrv.de."),
  CNAME("autodiscover", "mail.cxsrv.de."),

  // MX
  MX("@", 10, "mail.cxsrv.de."),

  // SPF
  SPF_BUILDER({
    label: "@",
    parts: ["v=spf1", "mx", "~all"],
  }),
  SPF_BUILDER({
    label: "*",
    parts: ["v=spf1", "mx", "~all"],
  }),

  // SRV
  SRV("_autodiscover._tcp", 0, 1, 443, "mail.cxsrv.de."),
  SRV("_caldavs._tcp", 0, 1, 443, "mail.cxsrv.de."),
  SRV("_carddavs._tcp", 0, 1, 443, "mail.cxsrv.de."),
  SRV("_imap._tcp", 0, 1, 143, "mail.cxsrv.de."),
  SRV("_imaps._tcp", 0, 1, 993, "mail.cxsrv.de."),
  SRV("_pop3._tcp", 0, 1, 110, "mail.cxsrv.de."),
  SRV("_pop3s._tcp", 0, 1, 995, "mail.cxsrv.de."),
  SRV("_sieve._tcp", 0, 1, 4190, "mail.cxsrv.de."),
  SRV("_smtps._tcp", 0, 1, 465, "mail.cxsrv.de."),
  SRV("_submission._tcp", 0, 1, 587, "mail.cxsrv.de."),

  // TXT
  TXT("_caldavs._tcp", "path=/SOGo/dav/"),
  TXT("_carddavs._tcp", "path=/SOGo/dav/"),
  TXT(
    "_dmarc",
    "v=DMARC1; p=quarantine; rua=mailto:reports@dmarc.fhsrv.de; ruf=mailto:reports@dmarc.fhsrv.de; fo=1;"
  ),
];

// Domains - Backend

// cxsrv.de
D(
  "cxsrv.de",
  REGISTRAR,
  MAIL01,

  // FSN1-DC10 / FSN1-DC12 - Backup
  A("backup", "148.251.152.30"),
  AAAA("backup", "2a01:4f8:210:5126::1"),

  // DUS1 - DATA
  A("data", "161.97.146.6"),
  AAAA("data", "2a02:c206:3007:8578::1"),

  // DUS1 - Mail
  A("mail", "161.97.146.6"),
  AAAA("mail", "2a02:c206:3007:8578::1"),

  // DUS1 - MC
  A("mc", "161.97.146.6"),
  AAAA("mc", "2a02:c206:3007:8578::1"),

  // DUS1 - VOICE
  A("voice", "161.97.146.6"),
  AAAA("voice", "2a02:c206:3007:8578::1"),

  // NBG1-DC3 - VoiceOld
  A("voiceold", "162.55.60.38"),
  AAAA("voiceold", "2a01:4f8:1c1c:9680::1"),

  // TLSA
  TLSA(
    "_25._tcp.mail",
    3,
    1,
    1,
    "df16c0d356bcdaf2a5d8280303ef55abb4d20205569ba5baf07904938d4960e1"
  ),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5BmnzgIW7nXALIhYQn0RoNodFy56R7RUPrrDaGSMkurXkbSmnTr5TApMHO5ujxR+i3Jq5S76nMKzlWt37V8c0uKViybahslI6eHt5zHa66JOigvF34cBSHZzolOCoPNCAAo10zmrbelIisa+0+PCU0VCrYuVxKzNXL9nOakZL2Pjzpsjdi9TL8av77wcdzm2YdLXcvDJ7oqPYNqLipYk34ipfUbrgXqi/98Pvgn9rYS02n+9AWAurkJ8ifIjRqfnUst2jFSFNhdWBpFpvfY3G1wy4dXYUijjI9Dl2NlLYQBmrQZZtPxa2k0O3WtZ8KXJHBJG0PP1876AVpxadqUYhQIDAQAB"
  )
);

// Domains - Projekte

// rsmg-clan.de
D(
  "rsmg-clan.de",
  REGISTRAR,
  MAIL01,

  // CNAME - DATA
  CNAME("cloud", "data.cxsrv.de."),
  CNAME("git", "voiceold.cxsrv.de."),
  CNAME("pma", "data.cxsrv.de."),
  CNAME("vpn", "data.cxsrv.de."),

  // CNAME - MAIL
  CNAME("mail", "mail.cxsrv.de."),

  // CNAME - MC
  CNAME("mc", "mc.cxsrv.de."),

  // CNAME - VOICE
  CNAME("amongus", "voiceold.cxsrv.de."),
  CNAME("crewlink", "voiceold.cxsrv.de."),
  CNAME("music", "voiceold.cxsrv.de."),
  CNAME("ts3", "voice.cxsrv.de."),
  
  // SRV
  SRV("_ts3._udp.ts3", 1, 1, 9987, "voice.cxsrv.de."),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2Z7Kra9m/OBpeKxu4HVadFEGDMO97vjF4sxgcjhat3lxk4qyXDCXNIpMcwpjIfYc0vWSrDpkwasSuQpSWarHZy76eCpFlGME0U02LmDb/TsQxO+5gqZduW2bqiYr6red3PT5P71Vmh8QALWw52L2CZqGW0vuMwTrNbUdix2tgRLTGUrukGu8XegLA70r1xowI5EXwA3USEkmTZPezaBHa084bNyI0v/V91Cz1ixRYnOW9iUzhWUwUH4mwTOHs6yiPBcY8ystA+7cxe7jaezEYjvfoP48uHP9yLQDhLBt9EaY7mVKW8FUbwA2awZbIexOGC/XCwZ4f24ASgwsgTfkWQIDAQAB"
  )
);
