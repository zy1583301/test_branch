/*---------------------------------------------------------------------------------------
 *  Gin [ zhouweiping@aibank.com | eric.prototype@gmail.com ]
 *  Created by 2019-09-26 18:34
 *  Updated at 2019-10-31 17:01
 *  Copyright © 2019 Aibank. All Rights Reserved.
 *-------------------------------------------------------------------------------------*/

import * as monaco from "monaco-editor";
import "../../../../node_modules/monaco-editor/min/vs/editor/editor.main.css";
import { suggestionsInitialize, languageInitialize } from "./hql/index";
import { parser } from "dt-sql-parser";
import { debounce } from "./util";

const Themes = [
  "Active4D",
  "All Hallows Eve",
  "Amy",
  "Birds of Paradise",
  "Blackboard",
  "Brilliance Black",
  "Brilliance Dull",
  "Chrome DevTools",
  "Clouds Midnight",
  "Clouds",
  "Cobalt",
  "Dawn",
  "Dominion Day",
  "Dreamweaver",
  "Eiffel",
  "Espresso Libre",
  "GitHub",
  "IDLE",
  "idleFingers",
  "iPlastic",
  "Katzenmilch",
  "krTheme",
  "Kuroir Theme",
  "LAZY",
  "MagicWB (Amiga)",
  "Merbivore Soft",
  "Merbivore",
  "monoindustrial",
  "Monokai Bright",
  "Monokai",
  "Night Owl",
  "Oceanic Next",
  "Pastels on Dark",
  "Slush and Poppies",
  "Solarized-dark",
  "Solarized-light",
  "SpaceCadet",
  "Sunburst",
  "Textmate (Mac Classic)",
  "themelist",
  "Tomorrow-Night-Blue",
  "Tomorrow-Night-Bright",
  "Tomorrow-Night-Eighties",
  "Tomorrow-Night",
  "Tomorrow",
  "Twilight",
  "Upstream Sunburst",
  "Vibrant Ink",
  "Xcode_default",
  "Zenburnesque"
];

/**
 * SqlParse
 * return Func(fn, j)
 */

/*
 * Please store this class's instance in somewhere like: window.__editor.
 * Get IStandaloneCodeEditor by property called this.instance.
 * You can get monaco in window.monaco.
 */

export default class Editor {
  constructor(htmlDomElement, value = "") {
    this.instance = null;
    this.themesAdded = false;
    this.themes = [];
    this.register(htmlDomElement, value);
    this.sqlParse = this.makeHQLSyntaxChecker();
  }

  async register(htmlDomElement, options) {
    const instance = monaco.editor.create(
      htmlDomElement,
      Object.assign(
        {
          value: ["select avg(field1) as avgvalue from table1"].join("\n"),
          glyphMargin: true,
          minimap: {
            enabled: false
          },
          automaticLayout: true,
          theme: "vs",
          language: "hql"
        },
        options
      )
    );

    this.instance = instance;

    if (!window.__isInitEditor__) {
      languageInitialize();
      suggestionsInitialize();
    }

    window.__isInitEditor__ = instance;
    return instance;
  }

  /*---------------------------------------------------------------------------------------
   * Important! this function can not add all themes in that dictionary.
   * Return a Promise.all
   * Promise.all result is an array with success added themes.
   *-------------------------------------------------------------------------------------*/
  /*
   */
  async addThemes() {
    //if (this.themesAdded) return Promise.all([]);
    //this.themesAdded = true;
    return new Promise(resolve => {
      const tasks = Themes.map(theme =>
        import(`monaco-themes/themes/${theme}.json`)
      );
      Promise.all(tasks).then(results => {
        const names = [];
        results.map((config, index) => {
          const name = Themes[index].replace(/\s/g, "-");
          let success = true;
          try {
            monaco.editor.defineTheme(name, config);
          } catch (e) {
            success = false;
            console.warn(e);
            //reject(e);
          }
          if (success === true) {
            //console.log(this);
            this.themes.push(name);
            names.push(name);
          }
        });
        resolve(names);
      });
    });
  }

  setTheme(name) {
    if (!this.themes.includes(name)) {
      console.warn(`Has Themes: \n${this.themes}`);
      throw new Error(`Not have this theme ${name}`);
    }
    monaco.editor.setTheme(name);
  }

  getValue() {
    return this.instance.getValue();
  }

  setValue(value) {
    return this.instance.setValue(value);
  }

  formatCode() {
    return this.instance.getAction("editor.action.formatDocument").run();
  }

  changeLanguage(languageId) {
    return monaco.editor.setModelLanguage(this.instance.getModel(), languageId);
  }

  distroy() {
    return this.instance.dispose();
  }

  getDomNode() {
    return this.instance.getDomNode();
  }

  fullScreen() {
    this.instance.htmlDomElement.classList.add("monaco-editor-full-screen");
  }

  normalScreen() {
    this.instance.htmlDomElement.classList.remove("monaco-editor-full-screen");
  }

  insertText(text) {
    let selection = this.instance.getSelection();
    let range = new monaco.Range(
      selection.startLineNumber,
      selection.startColumn,
      selection.endLineNumber,
      selection.endColumn
    );
    let id = { major: 1, minor: 1 };
    let op = {
      identifier: id,
      range: range,
      text: text,
      forceMoveMarkers: true
    };
    this.instance.executeEdits("UPDATE_TEXT", [op]);
    this.instance.focus();
  }

  /**
   * Not use this method direct
   * Use sqlParse
   */
  makeHQLSyntaxChecker(timeout = 500) {
    return debounce(() => {
      const val = this.instance.getValue();
      const validParser = parser.parseSyntax(val, "hive");
      const decora = this.decorations || [];
      let newDecora = [];
      if (validParser) {
        this.isParseSuccess = false;
        const warningLalbel = `编译语句时异常：在行${validParser.loc.first_line}:${validParser.loc.first_column}，输入词'${validParser.text}'附近可能存在sql语法错误`;
        const range = new window.monaco.Range(
          validParser.loc.first_line,
          validParser.loc.first_column,
          validParser.loc.last_line,
          validParser.loc.last_column + 1
        );
        newDecora = [
          {
            range,
            options: {
              inlineClassName: "inlineDecoration",
              glyphMarginClassName: "glyphMarginClass",
              hoverMessage: {
                value: warningLalbel
              }
            }
          }
        ];
        this.decorations = this.instance.deltaDecorations(decora, newDecora);
      } else {
        this.isParseSuccess = true;
        this.decorations = this.instance.deltaDecorations(decora, []);
      }
    }, timeout);
  }
  getSelectionValue() {
    let selection = this.instance.getSelection();
    let startLine = selection.startLineNumber;
    let startColumn = selection.startColumn;
    let endLine = selection.endLineNumber;
    let endColumn = selection.endColumn;
    let model = this.instance.getModel();
    let str = "";
    if (startLine < endLine) {
      for (let i = startLine + 1; i < endLine; i++) {
        str += model.getLineContent(i) + "\n";
      }
      str =
        model
          .getLineContent(startLine)
          .substring(startColumn - 1, model.getLineContent(startLine).length) +
        "\n" +
        str +
        model.getLineContent(endLine).substring(0, endColumn - 1);
    } else if (startLine === endLine && startColumn !== endColumn) {
      str = model
        .getLineContent(startLine)
        .substring(startColumn - 1, endColumn - 1);
    } else {
      str = "";
    }
    return str;
  }
}
