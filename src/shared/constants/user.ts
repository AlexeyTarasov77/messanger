export const DEFAULT_AVATAR_URL =
  "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png";
export const user = {
  id: "1",
  username: "Lina Li",
  isOnline: true,
  avatarUrl: "",
  email: "",
  password: "",
  createdAt: "",
  updatedAt: "",
  viewedPosts: [],
  likedPosts: [],
  createdPosts: [
    {
      id: 1,
      body: "Інколи найкращі ідеї народжуються в тиші 🌿 Природа, книга і спокій — усе, що потрібно, аби перезавантажитись.",
      tags: [
        "відпочинок",
        "натхнення",
        "життя",
        "природа",
        "читання",
        "спокій",
        "гармонія",
      ],
      likesCount: 120,
      viewsCount: 890,
      media: [
        {
          type: "IMAGE",
          url: "https://media-hosting.imagekit.io/594b271283ba4cee/screenshot_1746977794719.png?Expires=1841585795&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=SUqufwWd5VqxyyGhEt-MGrtq7o3BoK33p1zk0Rl4k1y0kxFZPlRDBbZBPnqz8Cmbfscuwm-QfSwLE8FypAG1NlyAOXOY8LAqqI9o4vOVK1JTNspUpNuJ80bGldXvOrgQMfoct453s9oWIbFFC609ZvDqkaJG4ITm5UILBvLj-ADY165TwZezH2OMBptEzLVFIAU3-2-g9yTi-3y3nPXm4nHNBtAn3yPVXtxqLDwyUC9Nl~Ml~LfFTpkPfBhloqr9ooyVcnGPSnyBIE0MAVLdyM4RE7I509zdu~QZTrHhyp3TAHCjPHneo-NCeTmyyb-kXIHD0o6rUgi4ymPnVUeTqQ__",
        },
        {
          type: "IMAGE",
          url: "https://media-hosting.imagekit.io/f2de6be914074f88/screenshot_1746977904912.png?Expires=1841585905&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Da1yYg0m~2u0cFA2dHXD1nBa-UTqkUCaoKFyYltzttCVN0VvpuOVYTtQNJBGmo~6Q5y9JSw3ZNiE6m0Vp3vjwD6JX~0j8-AcpzE0NsFjBhSKCZjpDpuUe0hxjyiXs3XVbrtubQchkvPblybrIIcNmJDIwv~804kCu~wqU8Ve-4Cx1jqy5yLXLvXIJ3jylD174zYdYc7Ng6PMitPZbw1B2P2wiOU9KpiDyBEKVXDpZIz~aTPhPG4PQRQWhaK6MGvhynV3~9pM5UlOGv~Le8LRoFeSqNVgeQC5T2OzmcfFOYQW4mSq~ASuRgZIZQwf0FCyh1gZ6B9MdXnTcH3VWt8rMA__",
        },
        {
          type: "IMAGE",
          url: "https://media-hosting.imagekit.io/b35b1a74d9e3453c/screenshot_1746977978966.png?Expires=1841585979&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=HRHbU5g7xCqN-PkgdPbBY9JQwoYEZKbcImr0HTCjVzyEn0g~QMU3M3Pku~7SjQ5ERkuwsh6r4TG9nyY7H2lcYWUlekH-QjDr3~r~GTDjpSEDLofSPPA-8TR1G5-X-HPLRsij~ARTweeQMzHdL3AzWeHoM7GePQIgPXEjYEdAkhj0-tnHfH7XlDICz8LceYiaw2gp1DhuwBi8imTk2nTf5AvHQIfr8QbEdSVwtgXl1kWk-UmWkGpo1JgiSXDmJ8-cNK2PQpQgmUIhnQ-d3oTOpis3-3Kw4FnAeTOcjfslLSa-pQfES2Vb9mjp0OWh00TwNcDxuGJtL0YJ46hgULrlxQ__",
        },
        {
          type: "IMAGE",
          url: "https://media-hosting.imagekit.io/7028f551af9a4f08/screenshot_1746978128292.png?Expires=1841586129&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=NV8PaBIBZdfYYpacJIoJVu8KSJ3dwHqMspPR8mUwuWqzWT5POIfALkhHfbOUM-L-I5m12e6WDcssocUec9ea94I49HF8EwWohYTcTC7KTprah6pCM77r3Nzufajw1YgatXii-ncxp-2GsU6e5k08pOmEPxY~pMYoJjNAal20n0SEUWTedxCI-jKxZr4QoxdJDQ1DRO-M79Yl93sQr2~NSlRT7Gu~UwgHBnwmaaeuL5tA3d~IgbK3BaP5F3FifzBTSbMBUElkdR4ri4mbuszjN~urJZybHM-AA89sebs24cUiyYK5pEZq4PVbvhDPJq8C27Yqeko1aiTOmtK8-sCK1A__",
        },
        {
          type: "IMAGE",
          url: "https://media-hosting.imagekit.io/fbc714bfc78942e2/screenshot_1746978162264.png?Expires=1841586163&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gTit-5mS19Qph5q5XSmCTLV~DwvVtO-vzJvYhQGAYewJMSjqUJHfWpvvitYJC6VXKKlAuYrs6Uo3llcPDEJqx04k2b4vLFBH9TiHBq2SeGuR0XXs9-M-csiGrdIxuRGU1Xd3cZjLQXOJzSJveyL-skoyVgAJvaXaM6alHf2lVjBal1PMsqyk8ijyxjiWpRRTHhlMaOy~yAUMvb8c~BpeQ5FB8nnLiH2V51xT64gxo-elv6Ypjkd1mB56WpINsThqEFJIZHpJ7cvJ-Cs8b-hqMGo6jNIykvOJZLRvjAfPR26HGwHDpeXryWx7PmB-i6ELSpbaqccECvYpLpUk~uP-Hg__",
        },
      ],
    },
    {
      id: 2,
      body: "буває такий настрій: просто лежиш і існуєш 😅 чай в одній руці, телефон в іншій, думки десь у космосі 🌌 і знаєте шо? норм",
      tags: ["вайб"],
      likesCount: 120,
      viewsCount: 890,
      media: [],
    },
  ],
};
