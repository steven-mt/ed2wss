# ED2WSS (EncoreDecks to Weiss Schwarz Simulator) Import Converter

A tool that converts the exported the text (`.txt`) file from EncoreDecks into a
format that can be imported to the
[Weiss Schwarz Simulator by Blake Thoennes](https://blakethoennes.itch.io/weiss-schwarz).

## Problem

When trying to export a deck from EncoreDecks and then import it into Weiss Schwarz
Simulator (WSS), you would receive an error message, and the deck would not be loaded
into WSS. This is because the format that EncoreDecks export text files are in is
different from the format of the import text files that WSS accepts.

A possible workaround that would get the deck to load into WSS is to copy the contents
of the exported text file and paste it into WSS using the "Paste Deck Text" option.
However, with a text file, players can keep it for multiple uses such as importing
it again at a later time or sharing it with other players. This tool aims to make
the conversion simple and convenient as a web app that is hosted online. For anyone
interested, there is a command-line tool called [WSMTools](https://github.com/ronelm2000/wsmtools)
that can be used, which has more advanced features and supports various sources.

## Usage

Navigate to the [site](https://ed2wss.vercel.app) and upload the text file that you
obtained by exporting a deck from EncoreDecks. You can also copy and paste the text
into the input box. Click "Convert" and the result can be copied or saved to a text
file.

It is possible to install the web app as a PWA to avoid having to go to the browser
everytime you want to use the tool, which would be convenient for frequent users.

## Limitations

- Some sets may not have been added yet to WSS, which means that not all decks in
  EncoreDecks can be used in WSS.
- If a set is in both English and Japanese, the tool cannot tell which language
  the set is in for WSS. The user must manually check the language that is used
  in WSS, and adjust the checkboxes under the "Sets" section. This section shows
  the sets that are in the deck, and the checkboxes next to them would be checked
  if they are the English version of a set that is also available in Japanese.
- The PWA currently does not work offline.

## Development

This project is based on an Astro template called
[astro-pwa-starter](https://github.com/shaunchander/astro-pwa-starter).
Their [README](https://github.com/shaunchander/astro-pwa-starter/blob/master/README.md)
has useful information for development such as commands and project structure.
