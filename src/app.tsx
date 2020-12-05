import * as React from "react";
import * as ReactDOM from "react-dom";
import { TrixEditor, TrixEditorProps, MergeTags, MergeTag, Editor } from "react-trix";

interface IState {
  html: string;
  text: string;
  initialValue: string;
  loaded: boolean;
  html2: string;
  text2: string;
}

class App extends React.Component<any, IState> {
  public readonly state: IState = {
    html: "",
    text: "",
    initialValue: "",
    loaded: false,
    html2: "",
    text2: ""
  }
  componentDidMount() {
    // mimicking call to database/data source
    setTimeout(() => {
      var s = this.state;
      s.initialValue = "<p>hello world from database</p>";
    }, 1500);
  }
  handleReady(editor: Editor) {
    editor.insertString("from inside ready callback");
  }
  handleChange(html: string, text: string) {
    let s = this.state;
    s.html = html;
    s.text = text;

    this.setState(s);
  }
  handleChange2(html: string, text: string) {
    let s = this.state;
    s.html2 = html;
    s.text2 = test;
    this.setState(s);
  }
  render() {
    let mt: Array<MergeTags> = [];
    mt.push({
      trigger: "{",
      tags: [
        { name: "First name", tag: "{{ .FirstName }}" },
        { name: "Last name", tag: "{{ .LastName }}" },
        { name: "Email", tag: "{{ .Email }}" },
      ]
    });
    mt.push({
      trigger: "@",
      tags: [
        { name: "Bob", tag: "@bob" },
        { name: "Gilles", tag: "@gilles" },
        { name: "Jean-Carl", tag: "@jc" }
      ]
    });

    const formFields: { [key: string]: string } = {};
    formFields["ok"] = "true";
    formFields["working"] = "yep";

    return (
      <div>
        <TrixEditor
          autoFocus
          mergeTags={mt}
          uploadURL="http://localhost:3000/test"
          uploadData={formFields}
          fileParamName="blob"
          className="testing-this-cls-name"
          placeholder="test"
          value={this.state.initialValue}
          onChange={this.handleChange.bind(this)}
          onEditorReady={this.handleReady.bind(this)}
        />
        <p>{this.state.text}</p>
        <pre>{this.state.html}</pre>

        <TrixEditor
          mergeTags={mt}
          className="testing-this-cls-name"
          placeholder="test"
          value="a second editor"
          onChange={this.handleChange2.bind(this)}
        />

        <p>{this.state.text2}</p>
        <pre>{this.state.html2}</pre>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));