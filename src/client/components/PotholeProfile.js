import React, { Component } from 'react';
import axios from 'axios';
import { Comment, Image, Grid, Header, GridColumn } from 'semantic-ui-react';
import PotholeComment from './PotholeComment';

export default class PotholeProfile extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      pothole: {},
      potholeId: params.id,
      comments: [],
    };
    // const { match: { params } } = this.props;
  }

  componentDidMount() {
    const { potholeId } = this.state;
    axios.get(`/pothole/${potholeId}`)
      .then((pothole) => {
        this.setState({
          pothole: pothole.data,
        });
        return axios.get(`/comments/${potholeId}`);
      })
      .then((comments) => {
        console.log(comments);
        this.setState({
          comments: comments.data,
        });
      });
  }

  render() {
    const { pothole, comments } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image src={pothole.image} size="medium" />
          </Grid.Column>
          <Grid.Column width={12}>
            text
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center" width={9}>
            <Header as="h2" dividing>
              Comments
            </Header>
            <Comment.Group>
              {comments.map(comment => <PotholeComment comment={comment} key={comment.id} />)}
            </Comment.Group>
          </Grid.Column>
          <Grid.Column width={4} floated="right">
            <Header as="h2" dividing>
              Donators
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
