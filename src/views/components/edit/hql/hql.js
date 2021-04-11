/*---------------------------------------------------------------------------------------
 *  Gin [ zhouweiping@aibank.com | eric.prototype@gmail.com ]
 *  Created by 2019-09-26 18:32
 *  Copyright © 2019 Aibank. All Rights Reserved.
 *-------------------------------------------------------------------------------------*/

import { languages } from "monaco-editor";
import langDefinition from "./lang";
import { makeTablesProposals, makeDbsProposals, makeKeywordsProposals } from "./keys";
// import makeTablesProposals from "./tables";
import makeUDFsProposals from "./udf";
import createSnippets from "./snippets";
import sqlFormatter from "../sqlFormatter/sqlFormatter";

/**
 * RichLanguageConfiguration
 * Get from [monaco-languahes](https://github.com/microsoft/monaco-languages)
 */
const richLanguageConfiguration = {
  comments: {
    lineComment: "--",
    blockComment: ["/*", "*/"]
  },
  brackets: [["{", "}"], ["[", "]"], ["(", ")"]],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ]
};

/**
 * Init HQL language
 */
let dabase = []
function languageInitialize() {
  languages.register({ id: "hql" });
  languages.setLanguageConfiguration("hql", richLanguageConfiguration);
  languages.setMonarchTokensProvider("hql", langDefinition);

  languages.registerDocumentFormattingEditProvider("hql", {
    provideDocumentFormattingEdits: function(model) {
      let range = model.getFullModelRange();
      let value = model.getValue();
      let newValue = sqlFormatter.format(value);
      return [
        {
          range: range,
          text: newValue
        }
      ];
    }
  });
}

/**
 * Register for HQL
 * Provide completionItems and snippets
 */
function suggestionsInitialize() {
  languages.registerCompletionItemProvider("hql", {
    triggerCharacters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._".split(
      ""
    ),
    async provideCompletionItems(model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });

      // const tableProposals = makeTablesProposals().map(item =>
      //   Object.assign({}, item, {
      //     label: item,
      //     insertText: item,
      //     documentation: "表字段",
      //     detail: "表字段",
      //     kind: languages.CompletionItemKind.Keyword
      //   })
      // );

      // const dbProposals = makeDbsProposals().map(item =>
      //   Object.assign({}, item, {
      //     kind: languages.CompletionItemKind.Keyword
      //   })
      // );

      const keywordsProposals = makeKeywordsProposals().map(item =>
        Object.assign({}, item, {
          label: item.label.toUpperCase(),
          kind: languages.CompletionItemKind.Keyword,
          insertText: item.insertText.toUpperCase() + " ",
          detail: item.detail,
          documentation: item.documentation
        })
      );

      const UDFsProposals = makeUDFsProposals().map(item =>
        Object.assign(
          {},
          {
            label: item.toUpperCase(),
            kind: languages.CompletionItemKind.Snippet,
            insertText: item.toUpperCase() + "(${1}) ${0}",
            detail: item,
            insertTextRules:
              languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: item
          }
        )
      );


      // const tableMatch = textUntilPosition.match(
      //   /[from|join]\s+(\w+)\.(\w+)?$/i
      // );
      // // ToDo: join db
      // const databaseMatch = textUntilPosition.match(/[from|json]\s+\w+$/i);
      // const functionMatch = textUntilPosition.match(
      //   /(select|where|on|having|order by|cluster by|sort by)\s+\w+$/i
      // );
      // const keywordMatch = textUntilPosition.match(/([^"]*)?$/i);
      //
      // let result = [];


      let tableMatch = null;
      // let clusterMatch = null;
      // ToDo: join db
      let databaseMatch = null;

      // /[from|join|into|like|table]\s+\w+$/i
      databaseMatch = textUntilPosition.match(/[from|join|table|into|like]\s+\w+$/i);
      tableMatch = textUntilPosition.match(/[from|join|into|like|table]\s+(\w+)\.(\w+)?$/i);
      const functionMatch = textUntilPosition.match(
        /(select|where|on|having|order by|cluster by|sort by)\s+\w+$/i
      );
      let keywordMatch = []
      keywordMatch = textUntilPosition.match(/([^"]*)?$/i);
      let result = [];




      if (tableMatch) {
        let dbId = null;
        let engineID = null;
        let temArr = textUntilPosition.substring(0,textUntilPosition.length-1).split('.');
        let temDb = '';
        if(temArr.length%2 == 0){
          let temDbarr = temArr[temArr.length-2].split(" ");
          temDb = temDbarr[temDbarr.length-1];
        }else{
          temDb = temArr[temArr.length-1].split(" ")[temArr[temArr.length-1].split(" ").length-1];
        }
        dabase.map(item => {
          if (item.insertText === temDb) {
            dbId = item.id,
              engineID = item.engineID
          }
        })

        const tableProposals = (await makeTablesProposals(engineID, dbId)).map(item =>
          Object.assign({}, item, {
            kind: languages.CompletionItemKind.EnumMember
          })
        )
        result = tableProposals;


      } else if (databaseMatch) {
        // console.log(databaseMatch)
        // console.log( "db");
        // const dbProposals = (await makeDbsProposals()).map(item =>
        //   Object.assign({}, item, {
        //     kind: languages.CompletionItemKind.Keyword
        //   })
        // );
        // dabase = dbProposals
        // result = dbProposals;
      } else if (functionMatch) {
        console.log("UDFs");
        result = UDFsProposals;
      } else if (keywordMatch) {
        console.log("keyword");
        // todo add snippets
        result = keywordsProposals;
      }
      return {
        suggestions: result
      };
    }
  });
}

/**
 * Snippets definition
 */
const getSnippets = () =>
  createSnippets().map(item =>
    Object.assign({}, item, {
      kind: languages.CompletionItemKind.Snippet,
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
    })
  );

export { suggestionsInitialize, languageInitialize };
