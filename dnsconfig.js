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
  CNAME("webmail", "mail.cxsrv.de."),

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

  // FSN1-DC14 - DH1
  A("dh1", "168.119.102.39"),
  AAAA("dh1", "2a01:4f8:c010:3218::1"),

  // FSN1-DC14 - Mail
  A("mail", "162.55.164.139"),
  AAAA("mail", "2a01:4f8:c010:758f::1"),

  // FSN1-DC14 - MC
  A("mc", "162.55.164.139"),
  AAAA("mc", "2a01:4f8:c010:758f::1"),

  // NBG-DC3 - Data
  A("data", "159.69.22.64"),
  AAAA("data", "2a01:4f8:c0c:e72c::1"),

  // NBG1-DC3 - Voice
  A("voice", "162.55.60.38"),
  AAAA("voice", "2a01:4f8:1c1c:9680::1"),

  // TLSA
  TLSA(
    "_25._tcp.mail",
    3,
    1,
    1,
    "8dd735fc435585f048b12b576cf11a89187e820b3a57ff72d1172f9a6bdad128"
  ),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvrv1QMXpTqH62q2u08WIiuS9W+qKZxWH47EzztFT17oMRs51GreR8jkvScRwmtzioIEFOcwdv27eImeozZXbQ1e9PmY36nZ1wtinGi8eUCoXYFMItpmvIraLDjNSmSye0NjvPtuYqnmfD9jQ3PRmgSk8IWz0Fzo61UmRilvu87FB8MQ36qkzmONGlwXeqL3UCssSTRCeyNRl1Gcw5W4nOuA5NiTN7dFA8wA8eHlzrhKkDhxP/oOqoxzUD6soHP1LLEZ4eBKeX49BxWta/CKfSlhOineAaqbthSAkQpn2WWYUGYcDHPN1hdv2qsaensir7i8Pi4PiBGzsB6PhwGx6uwIDAQAB"
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
  CNAME("git", "data.cxsrv.de."),

  // CNAME - DH1
  CNAME("amongus", "dh1.cxsrv.de."),
  CNAME("pma", "dh1.cxsrv.de."),
  CNAME("vpn", "dh1.cxsrv.de."),

  // CNAME - MAIL
  CNAME("mail", "mail.cxsrv.de."),

  // CNAME - MC
  CNAME("mc", "mc.cxsrv.de."),

  // CNAME - VOICE
  CNAME("crewlink", "voice.cxsrv.de."),
  CNAME("music", "voice.cxsrv.de."),
  CNAME("ts3", "voice.cxsrv.de."),

  // SRV
  SRV("_ts3._udp.ts3", 1, 1, 9987, "voice.cxsrv.de."),

  // TXT
  TXT(
    "dkim._domainkey",
    "v=DKIM1;k=rsa;t=s;s=email;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl8wPBLWXk52G3zu3FE0BDBHYfmmtvLExoPVkZZbvmrdDaHad3LfwEZmHHq96auk98OR2xoo8xX224dmM9cxR06sc9IfgdQpJ9rATKGDnmCTHLjY9SG3IspioS4uMn2zK4+OcOhih6HV4XdvpLjBjuxnMg1eNVVRpoN2K2fA/oOaZw09ySwCE/Ay/LHFJsdA1+t3X7UZpD4GZ9E1KxNAMK4ltf3r7/3Qay/+HrjwhFCa3RVaduED19zF6mdVpeEmXt1y/hGvbuDjrRu3RSvDbds8pwejzh9j5oHO1EY/Kmk3XUqszNaO78qUN8ZaLocxbc4aA5iWBtkhVGf08xbfUJwIDAQAB"
  )
);
