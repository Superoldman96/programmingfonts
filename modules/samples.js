/* eslint-disable no-useless-escape */
export class Samples {
  get (lang) {
    let code = ''

    switch (lang.toLowerCase()) {
      case 'none':
        code = prose;
        break;
      case 'css':
        code = CSS;
        break;
      case 'go':
        code = Go;
        break;
      case 'javascript':
        code = JS;
        break;
      case 'php':
        code = PHP;
        break;
      case 'python':
        code = Py;
        break;
      case 'ruby':
        code = Ruby;
        break;
      case 'shell':
        code = Bash;
        break;
      case 'ascii art':
        code = ASCII;
        break;
      default:
        code = '';
    }

    return code + `



    `
  }
}

const Bash =
`#!/bin/bash
set -e

NUMERALS=1234567890
SIMILAR="oO08 iIlL1 g9qCGQ 8%& <([{}])> .,;: ~-_="
DIACRITICS_ETC="â é ù ï ø ç Ã Ē Æ œ"

CD_CMD="cd "\\\"$(pwd)\\\"" && clear"
if echo "$SHELL" | grep -E "/fish$" &> /dev/null; then
	CD_CMD="cd "\\\"$(pwd)\\\""; and clear"
fi
VERSION=$(sw_vers -productVersion)
OPEN_IN_TAB=0

while [ "$1" != "" ]; do
	PARAM="$1"
	VALUE="$2"
	case "$PARAM" in
		--open-in-tab)
			OPEN_IN_TAB=1
			;;
	esac
	shift
done

if (( $(expr $VERSION '<' 10.7) )); then
	RUNNING=$(osascript<<END
	tell application "System Events"
			count(processes whose name is "iTerm")
	end tell
END
)
else
	RUNNING=1
fi

# adapted from https://github.com/SublimeText/Terminal
`

const Py =
`import os
import sublime
from pathlib import PurePath

NUMERALS = 1234567890
SIMILAR = "oO08 iIlL1 g9qCGQ 8%& <([{}])> .,;: ~-_="
DIACRITICS_ETC = "â é ù ï ø ç Ã Ē Æ œ"

class SideBarDuplicateCommand(SideBarCommand):

    def run(self, paths, **kwargs):
        source = self.get_path(paths, **kwargs)
        base, leaf = os.path.split(source)

        # find the file extension
        name, ext = os.path.splitext(leaf)
        if ext != '':
            while '.' in name:
                name, _ext = os.path.splitext(name)
                ext = _ext + ext
                if _ext == '':
                    break

        source = self.get_path(paths, **kwargs)

        input_panel = self.window.show_input_panel(
            'Duplicate As:', source, partial(self.on_done, source), None, None)

        input_panel.sel().clear()
        input_panel.sel().add(
            sublime.Region(len(base) + 1, len(source) - len(ext))
`

const PHP =
`<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class LuckyController
{
  const NUMERALS = 1234567890;
  const SIMILAR = "oO08 iIlL1 g9qCGQ 8%& <([{}])> .,;: ~-_=";
  const DIACRITICS_ETC = "â é ù ï ø ç Ã Ē Æ œ";

    #[Route('/lucky/number/{max}', name: 'app_lucky_number')]
    public function number(
    int $max,

        #[Autowire(service: 'monolog.logger.request')]
        LoggerInterface $logger
    ): Response
    {
        $logger->info('We are logging!');
        $number = random_int(0, $max);

        return new Response(
            '<html><body>Lucky number: '.$number.'</body></html>'
        );
    }
}

// adapted from https://symfony.com/doc

`

const CSS =
`--numerals: 1234567890;
--similar: "oO08 iIlL1 g9qCGQ 8%& <([{}])> .,;: ~-_=";
--diacritics-etc: "â é ù ï ø ç Ã Ē Æ œ";

button {
    all: unset;
    display: flex;
    width: 20px;
    margin: 0 .5ex 0 0;
    border: 1px solid var(--light-grey);
    border-radius: 3px;
    background: linear-gradient(var(--bright-white), var(--light-grey));
    color: var(--medium-grey);
    cursor: pointer;

    /* handle dark-mode */
    @media (prefers-color-scheme: dark) {
        background: linear-gradient(var(--light-grey), var(--bright-white));
    }

    path,
    rect {
        fill: currentColor;
    }

    &:hover {
        color: var(--ink-black);
    }
    &.selected {
        background: var(--bright-white);
        color: var(--ink-black);
        box-shadow: none;
    }
    &:not(.selected) > svg:not(:first-child),
    &.selected > svg:not(.selected) {
        display: none;
    }

    &:disabled {
        color: var(--paper-white);
        background: var(--light-grey);
    }

    &.text-button {
        width: auto;
        margin: 0;
        padding: 0 .5ex;
    }
}
`

const Go =
`package main

var u uint = 1234567890
const similar = "oO08 iIlL1 g9qCGQ 8%& <([{}])> .,;: ~-_="
const diacritics = "â é ù ï ø ç Ã Ē Æ œ"

import (
  "bytes"
  "fmt"
  "math/rand"
  "time"
)

// Field represents a two-dimensional field of cells.
type Field struct {
  s    [][]bool
  w, h int
}

func NewField(w, h int) *Field {
  s := make([][]bool, h)
  for i := range s {
    s[i] = make([]bool, w)
  }
  return &Field{s: s, w: w, h: h}
}

func (f *Field) Alive(x, y int) bool {
  x += f.w
  x %= f.w
  y += f.h
  y %= f.h
  return f.s[y][x]
}

// Next returns the state of the specified cell at the next time step.
func (f *Field) Next(x, y int) bool {
  // Count the adjacent cells that are alive.
  alive := 0
  for i := -1; i <= 1; i++ {
    for j := -1; j <= 1; j++ {
      if (j != 0 || i != 0) && f.Alive(x+i, y+j) {
        alive++
      }
    }
  }
  return alive == 3 || alive == 2 && f.Alive(x, y)
}

// Life stores the state of a round of Conway's Game of Life.
type Life struct {
  a, b *Field
  w, h int
}

// adapted from https://go.dev
`

const JS =
`import { Cookies } from './cookies.js'
import { Samples } from './samples.js'

const numerals = 1234567890
const similar = "oO08 iIlL1 g9qCGQ 8%& <([{}])> .,;: ~-_="
const diacritics_etc = "â é ù ï ø ç Ã Ē Æ œ"

export class Language {
  el = document.getElementById('select-language')
  samples = new Samples

  // set initial value and start listening
  init () {
    if (Cookies.get('language')) {
      this.el.value = Cookies.get('language')
    }
    this.el.onchange = () => {
      this.set()
    }
    this.set()
  }

  set () {
    const lang = this.el.value

    window.CMeditor.doc.setValue(this.samples.get(lang))
    window.CMeditor.setOption('mode', lang.toLowerCase())
    window.CMeditor.refresh()

    Cookies.set('language', lang)
  }
}
`

const ASCII =
`1. Arduino Pinout ASCII Art:
   from https://github.com/busyDuckman/ascii-art-arduinos

                                  +-----+
     +----[PWR]-------------------| USB |--+
     |                            +-----+  |
     |         GND/RST2  [ ][ ]            |
     |       MOSI2/SCK2  [ ][ ]  A5/SCL[ ] |   C5
     |          5V/MISO2 [ ][ ]  A4/SDA[ ] |   C4
     |                             AREF[ ] |
     |                              GND[ ] |
     | [ ]N/C                    SCK/13[ ] |   B5
     | [ ]IOREF                 MISO/12[ ] |   .
     | [ ]RST                   MOSI/11[ ]~|   .
     | [ ]3V3    +---+               10[ ]~|   .
     | [ ]5v     | A |                9[ ]~|   .
     | [ ]GND   -| R |-               8[ ] |   B0
     | [ ]GND   -| D |-                    |
     | [ ]Vin   -| U |-               7[ ] |   D7
     |          -| I |-               6[ ]~|   .
     | [ ]A0    -| N |-               5[ ]~|   .
     | [ ]A1    -| O |-               4[ ] |   .
     | [ ]A2     +---+           INT1/3[ ]~|   .
     | [ ]A3                     INT0/2[ ] |   .
     | [ ]A4/SDA  RST SCK MISO     TX>1[ ] |   .
     | [ ]A5/SCL  [ ] [ ] [ ]      RX<0[ ] |   D0
     |            [ ] [ ] [ ]              |
     |  UNO_R3    GND MOSI 5V  ____________/
      \_______________________/


2. Box Drawing Characters:
   from https://en.wikipedia.org/wiki/Box-drawing_characters

     ┌───────────────────┐
     │  ╔═══╗ Some Text  │▒
     │  ╚═╦═╝ in the box │▒
     ╞═╤══╩══╤═══════════╡▒
     │ ├──┬──┤           │▒
     │ └──┴──┘           │▒
     └───────────────────┘▒
      ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


3. UUIDv6:
   from https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql#uuidv6

               ╭─── time_mid       ╭── node
              ╭┶─╮           ╭─────┶────╮
     e54af2ec-d381-11ee-a506-0242ac120002
     ╰──┮───╯      ╰─┮╯ ╰─┮╯
     time_hi         │    ╰── clock_sequence_and_version
                     ╰─────── time_low_and_version
`

const prose =
`’Twas brillig, and the slithy toves
	Did gyre and gimble in the wabe:
All mimsy were the borogoves,
	And the mome raths outgrabe.

“Beware the Jabberwock, my son!
	The jaws that bite, the claws that catch!
Beware the Jubjub bird, and shun
	The frumious Bandersnatch!”

He took his vorpal sword in hand;
	Long time the manxome foe he sought—
So rested he by the Tumtum tree
	And stood awhile in thought.

And, as in uffish thought he stood,
	The Jabberwock, with eyes of flame,
Came whiffling through the tulgey wood,
	And burbled as it came!

One, two! One, two! And through and through
	The vorpal blade went snicker-snack!
He left it dead, and with its head
	He went galumphing back.

“And hast thou slain the Jabberwock?
	Come to my arms, my beamish boy!
O frabjous day! Callooh! Callay!”
	He chortled in his joy.

’Twas brillig, and the slithy toves
	Did gyre and gimble in the wabe:
All mimsy were the borogoves,
	And the mome raths outgrabe.

- "Jabberwocky" by Lewis Carroll
`

const Ruby =
`# frozen_string_literal: true

class OrdersController < ApplicationController
  before_action :set_order, except: %i[index new create]

  NUMERALS = 1234567890
  SIMILAR = 'oO08 iIlL1 g9qCGQ 8%& <([{}])> .,;: ~-_='
  DIACRITICS_ETC = 'â é ù ï ø ç Ã Ē Æ œ'

  def index
    @orders = Order.all
  end

  def update
    if @order.update(order_params)
      flash[:notice] = 'Order was successfully updated.'
      redirect_to @order
    else
      render :action => 'edit'
    end
  end

  def destroy
    @order.destroy

    redirect_to orders_url
  end

  private

  def set_order
    @order = Order.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = 'Order not found'
    redirect_to orders_path
  end

  def order_params
    params.require(:order).permit(:name, :details)
  end
end

# adapted from https://github.com/FastArrow1019/RubyOnRails/
`
