![Preview image](./screenshots/preview.png)

Tracker tool for the FF4FE doors randomizer, bundled into a single HTML page.

## Notes
 - Mark towns and connecting locations with the appropriate names
   - New sub-entries will be automatically added, so note the exit too
 - Mark shops with `Shop` / inns with `Inn`
 - Mark things you don't care about with `Zonk`
 - Searching will find destinations, not doors (e.g. search for "cafe" at the end will show you all routes from overworld/underworld/moon to hand in your pass)
 - Note down important shops in the notes section
   - This could have been added in the big lists, but it took up too much space in practice so it is easier to just jot the important stuff here.

The icons to the side indicate:
 - If the spot launches a vehicle (e.g. hovercraft/airship/whale)
 - If the spot has KI checks / gives a KI
 - If the spot could give a character
 - If the spot is a shop

## Downloads
See releases to get the latest version

## Building

For development locally
```bash
npm run dev
```

For release builds
```bash
npm run build
```

