# Petal: App Store listing (copy and paste pack)

Checked against the running app: 8 lessons, 5 product types, 5 product-guide choices, 5 checklist habits, 6 FAQ questions (counted by `npm run screenshots`).
Run `npm run check:listing` after any edit. It enforces the length limits and your rules.
Anything in [SQUARE BRACKETS] is something only you can fill in.

## 1. Text fields (App Store Connect, version page, English U.S.)

### Name
```
Petal: Period Guide
```

### Subtitle
```
Gentle lessons for teens
```

### Keywords
```
menstrual,puberty,pad,tampon,cup,liner,underwear,cramp,hygiene,leak,school,first,beginner,tip,faq
```
Why these: Apple joins words from the name, subtitle and keywords into search phrases, so "first" + "period", "period" + "leak", "tampon" + "guide" and "school" + "period" all become searchable phrases without repeating a word. No category words (health, fitness, education), no competitor names, no spaces after commas.

### Promotional text
```
New to periods? Short, calm lessons walk you through your first period, pads, tampons, cups, leaks at school, and gentle self-care. No account needed.
```

### Description
```
Petal is a calm, judgment-free guide to periods for teens. Short step-by-step lessons walk you through what to do, one tiny step at a time.

WHAT'S INSIDE
• 8 short lessons: your first period, how to use a pad, tampons, period underwear, menstrual cups, a gentle hygiene routine, cramps and feeling better, and what to do about a leak at school
• A product guide: pick the moment that sounds like you (just starting, school and everyday, swimming or sports, reusable options, or sleep) and see which of 5 product types might fit: pads, period underwear, tampons, menstrual cups, and panty liners
• A feel-good checklist with 5 small habits
• Answers to 6 common questions, like "Is it normal to have a smell?" and "When is bleeding too heavy?"
• Bookmarks for the lessons you want to keep
• Guidance on when to talk to a doctor or nurse

PRIVATE BY DESIGN
No account. No sign-in. No ads. No tracking. Petal never asks for your name, location, photos, or the dates of your period. Your saved lessons and progress stay on your device, and you can clear them any time. Petal works without an internet connection, except for the links to outside websites.

GOOD TO KNOW
Petal gives general education, not medical advice. It is not a medical device and does not diagnose, treat, or predict anything. Product instructions differ, so always read the directions on the package. If you have heavy bleeding, severe pain, or something that worries you, talk to a doctor, a nurse, or another adult you trust. Links to ACOG, CDC, and FDA pages open in your browser.

Every body is different. There is no one perfect way to have a period, and you never have to figure it out alone.
```

### What's New (version 1.0)
```
First release.
```

### Review notes
```
Petal is an educational guide about periods for teens. It has no sign-in, no accounts, no purchases, no ads, and no network calls. All content is bundled in the app. A demo account is not needed.

HOW TO REVIEW
1. Launch the app. It opens on Home.
2. Tap "I'm new to periods" to open the first lesson. Tap "Got it, next step" to move through the steps.
3. Use the bottom tabs: Home, Lessons (8 lessons, search, bookmark icon on each card), Products (tap a choice under "What sounds like you?" and tap any product card), My care (checklist and 6 FAQ questions), Saved (bookmarked lessons).
4. Open "Privacy & sources" from the menu icon at the top right (on iPad, from the sidebar). It shows the privacy statement, links to ACOG, CDC, and FDA pages (they open in the browser), and the button "Clear saved lessons & progress", which is the data deletion path.

PERMISSIONS: none. The app does not use the camera, microphone, location, notifications, contacts, photos, or HealthKit.
DATA: nothing is collected or sent off the device. Finished lessons and bookmarks are stored locally on the device.
ACCOUNT DELETION: there are no accounts. Local data is cleared with the button in step 4, or by deleting the app.
HEALTH: general education only. It is not a medical device and has no diagnosis, cycle tracking, or predictions. It includes "when to get medical help" guidance and a toxic shock syndrome warning.
CONTACT: [YOUR NAME], [YOUR PHONE NUMBER], [YOUR SUPPORT EMAIL]
```

## 2. Optional second language: Spanish (Mexico)
Why: Apple indexes the Spanish (Mexico) keywords for the US store too, which gives you extra keyword space. Honest limit: the app itself is in English, so this text says so. Have a native Spanish speaker review it before you use it. Skip this section if you do not want it.

### ES Name
```
Petal: Guía de periodo
```

### ES Keywords
```
menstruación,regla,toallita,tampón,copa,calzón,cólico,higiene,pubertad,fuga,escuela,consejo,lista
```

### ES Description
```
Petal es una guía tranquila sobre la regla para adolescentes, con lecciones cortas paso a paso. Las lecciones y los textos de la app están en inglés.

Dentro encontrarás 8 lecciones cortas, una guía de productos, una lista de 5 hábitos y respuestas a 6 preguntas comunes. No necesitas cuenta, no hay anuncios y no se recopilan tus datos. Lo que guardas se queda en tu dispositivo.

Petal ofrece información general, no consejo médico. No es un dispositivo médico y no diagnostica, trata ni predice nada. Si tienes sangrado abundante, dolor fuerte o algo que te preocupe, habla con un médico, una enfermera u otro adulto de confianza.
```

## 3. Other fields on the app and version pages

| Field | What to enter |
|---|---|
| Primary category | Health & Fitness |
| Secondary category | Education |
| Price | Free (no in-app purchases, so no subscription text is needed) |
| App release | **Manual** release |
| Support URL (required) | [YOUR SUPPORT PAGE URL] |
| Marketing URL | Leave blank, or [YOUR WEBSITE] |
| Privacy Policy URL | [PUBLIC URL OF privacy.html]. The file is `public/privacy.html`. It only has a URL after the website is deployed, and deploying needs your OK. |
| Copyright | 2026 [YOUR COMPANY NAME] |
| Sign-in required | Leave unticked (there is no sign-in) |
| Demo account | Not needed |

## 4. Questionnaire answers

### Age rating
Apple works out the rating from these answers. These are my honest answers for the app as it is:

| Question | Answer |
|---|---|
| Parental controls, Age assurance | No |
| Unrestricted web access | No (links open in the browser, the app has no browser inside it) |
| User-generated content, Social media, Messaging and chat | No |
| Advertising | No |
| Profanity, Horror, Alcohol/tobacco/drugs, Gambling, Contests, Violence | None |
| Health or wellness topics | **Yes** |
| Medical or treatment information | **Infrequent or mild** (see the note) |
| Mature or suggestive themes | None |
| Sexual content or nudity | None (anatomy words are used only for hygiene education, with no sexual content) |
| Graphic sexual content | None |

Expected result: **13+**. Important notes:
- "Medical or treatment information" is a judgment call. "Infrequent" gives 13+. "Frequent" gives 16+. Petal is hygiene and self-care education with "see a doctor" guidance, so I chose infrequent. Answer it as you honestly see it. Do not pick an answer only to change the rating.
- A 13+ rating means a parent can block it on a child's iPhone under 13. If you want to reach younger readers, that needs separate decisions (the Kids category has its own rules, and children's privacy law applies). Ask a lawyer first.

### App Privacy (the "nutrition label")
Choose **Data Not Collected**. This is true only while the app has no analytics, no ads, and nothing is sent off the device. Re-check it whenever a plugin is added.

### Regulated medical device declaration
Answer **No**. Petal gives education only: no measurement, diagnosis, tracking, or prediction. Confirm this with a lawyer or regulatory adviser if you have any doubt.

### Content rights
"Does your app contain, show, or access third-party content?" Answer **No**. The text was written for Petal, and the ACOG, CDC, and FDA entries are plain links that open in the browser. The fonts and icons are open-licensed (see `docs/ASSET_RIGHTS.md`).

### Export compliance
Already answered in the app file (`ITSAppUsesNonExemptEncryption` is false). Petal uses no encryption of its own.

### EU Digital Services Act (trader status)
If you sell as a business, declare yourself a **trader** and enter your contact details, which are then shown in the EU. If you are not a business, declare **non-trader**. This one is your decision.

## 5. Screenshots (`store/screenshots/`, made by `npm run screenshots`)
Six screens in each size: Home, Lessons, a lesson step, Products, My care, Privacy. All are RGB PNG with no transparency. Sample state shown: 2 finished lessons and 2 bookmarks. Nothing private appears.

| Slot in App Store Connect | Folder to upload | Required? |
|---|---|---|
| iPhone 6.3" / 6.1" class (medium) | `1206x2622` (or `1179x2556`) | **Yes**, at least one |
| iPhone 6.9" class (large) | `1320x2868` (or `1290x2796`) | No, but best quality. Providing it also covers the 6.5" slot. |
| iPad 13" | `2064x2752` (or `2048x2732`) | **Yes**, because Petal runs on iPad |

Upload the folder with the larger size for each slot and ignore its alternative. Apple allows up to 10 per slot. Honest limit: these come from a desktop browser, not a real iPhone, so they have no status bar or notch.
