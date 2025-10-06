---
layout: page
title: Projects
heading: Project History
permalink: /projects/
---

## DuckDuckGo (2022–2025)  
**Role**: iOS & macOS Engineer  
[App Store →](https://apps.apple.com/app/id663592361)

DuckDuckGo provides a privacy-focused browser, search engine, and security suite across mobile and desktop platforms.

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/ddg_import_mac.png" alt="DuckDuckGo Import on Mac" />
</div>

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/ddg_vpn_iphone.PNG" alt="DuckDuckGo VPN on iPhone" width="240" />
<img src="/images/projects/ddg_vpn-widget_iphone.PNG" alt="DuckDuckGo VPN Widget on iPhone" width="240" />
<img src="/images/projects/ddg_sync_iphone.PNG" alt="DuckDuckGo Sync on iPhone" width="240" />
</div>

### Highlights
- **Feature Flag Infrastructure**: Architected a scalable, cross-platform feature flag system shared across iOS and macOS. Introduced **failsafe flags** for safer rollouts, reduced configuration overhead, and improved deployment velocity.
- **Sync & Import**: Led macOS onboarding for password and bookmark sync, increasing adoption 3–4×. Re-architected sync preferences into modular components and resolved critical Firefox import failures (e.g., PBKDF2 decoding issues).
- **VPN / Network Protection**: Built and shipped DuckDuckGo's VPN on iOS, including structured concurrency-based error handling, geo-switching, system settings, and TestFlight MVPs.
- **Alpha Builds & CI Tooling**: Designed daily internal build systems to accelerate feedback loops and QA. Regularly served as **DRI for iOS releases**, overseeing stability, metrics, and coordination.
- **Cross-functional Collaboration**: Partnered closely with backend, web, and Android teams on syncing protocols, remote config design, and platform parity.



---

## Mimi Hearing Technologies (2022)  
**Role**: iOS Lead / Technical Lead  
[App Store →](https://apps.apple.com/app/id932496645)

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/mimi_1.PNG" alt="Mimi Hearing Test Interface" width="240" />
<img src="/images/projects/mimi_2.PNG" alt="Mimi SDK Test Screen" width="240" />
</div>

Led engineering on Mimi's iOS SDK and internal hearing test apps.  
- Defined architectural and coding standards.  
- Introduced internal feature flagging and release train systems.  
- Coordinated with partners and cross-functional teams on SDK integration requirements.  
- Balanced medical-grade accuracy with performance and accessibility expectations.



---

## SoundCloud (2016–2021)  
**Role**: iOS Engineer → Senior iOS Engineer  
[App Store →](https://apps.apple.com/app/id336353151)

SoundCloud is a global platform for music sharing, streaming, and discovery, with over 100M installs.

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/sc_player_1_iphone.PNG" alt="SoundCloud Player Interface" width="240" />
<img src="/images/projects/sc_player_2_iphone.PNG" alt="SoundCloud Player Interface 2" width="240" />
<img src="/images/projects/sc_collection_iphone.PNG" alt="SoundCloud Collection" width="240" />
</div>

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/sc_home_iphone.PNG" alt="SoundCloud Home" width="240" />
<img src="/images/projects/sc_profile_iphone.PNG" alt="SoundCloud Profile" width="240" />
<img src="/images/projects/sc_album_iphone.PNG" alt="SoundCloud Album" width="240" />
</div>

### Highlights
- **Playback Infrastructure**: Owned SoundCloud’s iOS playback framework for streaming, buffering, interruptions, and queueing.
- **Cross-Platform Streaming (Flipper)**: Maintained a shared C++ playback engine used across iOS, Android, and web. Bridged Swift to C++ and built reliable platform abstractions.
- **Stations & Listening History**: Delivered radio-style continuous playback and paginated listening history with sync and offline support.
- **Chromecast Integration**: Added support for casting, session sync, and local/remote handoff via Google Cast SDK.
- **Architecture & Modularity**: Led modularisation effort, splitting the app into independently testable frameworks per feature.
- **Testing Culture**: Introduced TDD in Swift, wrote custom mocking strategies, and built internal UI test tools using the Page Object Model.
- **Backend & Tooling**: Wrote backend Scala endpoints and automation in Ruby for feature experiments and testing.



---

## FanDuel (2015–2016)  
**Role**: iOS Engineer  
[App Store →](https://apps.apple.com/app/id568168374)

After FanDuel acquired Kotikan, I contributed briefly to their iOS app, focused primarily on developer tooling.


- Built an internal snapshot testing framework combining KIF and Facebook's snapshot testing library.
- Streamlined UI verification and automated test reviews for the QA team.



---

## Standard Life (2014–2015)  
**Role**: iOS Engineer (via agency)

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/sl_topup_iphone.PNG" alt="Standard Life Top-up Interface" width="240" />
</div>

Built the Standard Life iOS app from scratch at a digital agency.
- Created secure, transactional user flows for pensions and investment products.
- Used **MVVM + ReactiveCocoa** to enable testable architecture.
- Developed custom UI automation using KIF and snapshot tests.
- Delivered under tight regulatory, accessibility, and security constraints.



---

## Skyscanner (2013–2014)  
**Role**: iOS Engineer  
[App Store →](https://apps.apple.com/app/id415458524)

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/ss_prices_ipad.PNG" alt="Skyscanner Price Comparison" />
</div>

<div style="text-align: center; margin: 20px 0;">
<img src="/images/projects/ss_recents_iphone.PNG" alt="Skyscanner Recent Searches" width="240" />
<img src="/images/projects/ss_cal_iphone.PNG" alt="Skyscanner Calendar" width="240" />
</div>

Skyscanner is a global travel search app used by tens of millions of travellers.

### Highlights
- Led adaptive UI refresh using **Auto Layout** ahead of iOS 7 and size classes.
- Built **SSO login flows** and implemented flight **Price Alerts** with backend subscriptions and push notifications.
- Owned key UI flows and built independently deployable social library.
- Advocated for and implemented full test coverage using TDD/BDD.



---

## Audio, Creativity & Side Projects

Before tech, I worked as a sound designer, composer, and audio engineer — passions that still shape my approach today. I care deeply about **quality UX in creative tools**, and have a particular interest in **live audio, interactivity, and accessibility**.


I’ve built tools and setups using Octatrack, HX Stomp, and reactive audio systems. Always exploring how technology can augment creativity.

