# Icon asset sources

## Icons8 Liquid Glass Icons
- Repository: https://github.com/icons8/liquid-glass-icons
- License: MIT, as stated in the repository README and LICENSE.
- The repository provides 100 free React icons in a Liquid Glass style with multi-layered gradients and transparency effects.
- Available icon component names include LgHome, LgClock, LgEmail, LgFolderInvoices, LgImageFile, LgMusic, LgPhone, LgPicture, LgSettings, LgSpeechBubble, LgSun, LgVideo-equivalent not listed, and others.
- README: https://github.com/icons8/liquid-glass-icons#readme
- Live demo: https://icons8.github.io/liquid-glass-icons

## TitanUI / Figma lead
- Page: https://www.titanui.com/128273-30-free-liquid-glass-style-web-icons-svg/
- Page says the pack is inspired by iOS 26 and can be exported as SVG/PNG from Figma.
- The page links to a Figma creator and a download redirect, but the direct Figma page was not usable in the sandbox. Do not rely on this pack for integration unless its files become directly accessible.

## Apple reference
- Apple iPadOS 26 announcement: https://www.apple.com/newsroom/2025/06/ipados-26-introduces-powerful-new-features-that-push-ipad-even-further/
- Apple describes iPadOS 26 Home Screen icons as updated with light/dark appearances, color tints, and a clear look using Liquid Glass.

## Downloaded Apple UI kit archive
- Public archive source: https://freebiesui.com/download/iOS%20and%20iPadOS%2026%20%28Community%29.zip
- The archive is 65,260,966 bytes and contains an 86.7 MB Figma `.fig` document plus its embedded `canvas.fig`, `meta.json`, `thumbnail.png`, and 383 extensionless image assets.
- The largest inspected asset (`bf4989f4f63e0a23de949f0463a32bc7a771b29f`, 3000×2300 PNG) is a black landscape iPad bezel with a blank black screen, not a complete home-screen UI. This kit can supply official frame/component assets, but the `.fig` file is not directly runnable in the browser; its contents must be translated or exported into web assets.

A second inspected asset (`7b519f15410878a9616cc58f4d4c73ff11d2129b`, 1470×3000 PNG) is a portrait black iPad bezel with camera, buttons, and a blank screen. It is suitable as a downloaded outer-device asset, but it is not itself a full interactive UI; the screen still needs to be rendered by the web app over the transparent/black center.

The portrait 1470×3000 asset is actually a tall black modern-device bezel rather than an iPad mini 5, while the 2388×1668 iPad-sized asset inspected is a clean abstract wallpaper only. The official kit therefore provides useful wallpapers and device/component references, but not a ready-to-run portrait iPad mini 5 Home Screen image. The simulator must keep its interactive React screen and use the kit assets as local visual sources where they fit.
