import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import aws_exports from './aws-exports';
import Amplify, { Analytics, Storage } from 'aws-amplify';
import { withAuthenticator, S3Album } from 'aws-amplify-react';
Amplify.configure(aws_exports);

Storage.configure({ level: 'private' });

class App extends Component {
  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    // had to change this to use .vault in order to get private storage.
    Storage.vault.put(name, file).then(() => {
      this.setState({ file: name });
    });
  };

  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }

  render() {
    return (
      <div className="App">
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <S3Album level="private" path="" />
      </div>
    );
  }
}

// add extra sign up field
// const signUpConfig = {
//   signUpFields: [
//     {
//       label: 'Organization',
//       key: 'organization',
//       required: false,
//       type: 'string',
//       custom: 'true',
//     },
//   ],
// };

export default withAuthenticator(App, true);
//export default withAuthenticator(App, { includeGreetings: true, signUpConfig });
