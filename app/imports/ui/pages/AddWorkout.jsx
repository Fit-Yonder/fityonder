import React from 'react';
import { Workouts, WorkoutSchema } from '/imports/api/workout/workout';
import { Container, Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddWorkout extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, image, description, category } = data;
    const owner = Meteor.user().username;
    Workouts.insert({ name, image, description, category, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (

        <div className='all-page-background' style={ { padding: '4em' } }>
          <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <AutoForm ref={(ref) => { this.formRef = ref; }} schema={WorkoutSchema} onSubmit={this.submit}>
                  <Segment>
                    <TextField name='name'/>
                    <TextField name='image'/>
                    <LongTextField name='description'/>
                    <TextField name='category'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name='owner' value='fakeuser@foo.com'/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </Container>
        </div>

    );
  }
}

export default AddWorkout;
