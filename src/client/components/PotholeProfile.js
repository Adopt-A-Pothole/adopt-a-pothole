import React, { Component } from 'react';
import axios from 'axios';
import {
  Comment,
  Image,
  Grid,
  Header,
  List,
  Progress,
  Item,
  Rating,
  Card,
  Form
} from 'semantic-ui-react';
import PotholeComment from './PotholeComment';
import UploadPothole from './UploadPothole';

export default class PotholeProfile extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      pothole: {},
      potholeId: params.id,
      comments: [],
      donators: [],
      progressImage: null,
      comment: '',
    };
    this.handleImageProgress = this.handleImageProgress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { potholeId } = this.state;
    axios.get(`/pothole/${potholeId}`)
      .then((pothole) => {
        this.setState({
          pothole: pothole.data,
          progressImage: pothole.data.progress_image,
        });
        return axios.get(`/comments/${potholeId}`);
      })
      .then((comments) => {
        this.setState({
          comments: comments.data,
        });
        return axios.get(`/pothole/donators/${potholeId}`);
      })
      .then((donators) => {
        this.setState({
          donators: donators.data,
        });
      });
  }

  onSubmit() {
    const { comment, potholeId } = this.state;
    axios.post('/comments', {
      pothole_id: potholeId,
      user_id: 3,
      user: 'Eliott Frilet',
      message: comment,
    })
      .then(() => {
        axios.get(`/comments/${potholeId}`)
          .then((comments) => {
            this.setState({
              comments,
            });
          });
      });
  }

  handleImageProgress(url) {
    const { potholeId } = this.state;
    axios.put(`/pothole/${potholeId}/image`, {
      progressImage: url,
    });
    this.setState({
      progressImage: null,
    });
  }

  handleChange(event) {
    const comment = event.target.value;
    this.setState({
      comment,
    });
  }

  render() {
    const { handleImageProgress } = this;
    const {
      pothole,
      comments,
      donators,
      progressImage
    } = this.state;
    const progress = Math.floor((pothole.money_donated / pothole.fill_cost) * 100);
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Card>
              <Image src={pothole.image} size="medium" />
            </Card>
            <Header>Progress image:</Header>
            <Card>
              {pothole.progress_image ? (
                <Image src={progressImage} />
              ) : null}
              <UploadPothole success={handleImageProgress} />
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>{pothole.title}</Item.Header>
                  <Item.Meta>Description</Item.Meta>
                  <Item.Description style={{ fontSize: 16 }}>
                    {pothole.description}
                  </Item.Description>
                  <Item.Description style={{ fontSize: 12 }}>
                    {'Zip code: '}
                    {pothole.zip}
                  </Item.Description>
                  <Item.Description style={{ fontSize: 12 }}>
                    Severity:
                    <Rating rating={pothole.severity} maxRating={3} disabled />
                  </Item.Description>
                  <Item.Description>
                    <p>Percent Funded: </p>
                    <Progress percent={progress} progress indicating />
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center" width={9}>
            <Form>
              <Form.TextArea label="Comment" placeholder="Write your comment here..." onChange={this.handleChange} />
              <Form.Button onClick={this.onSubmit}>Submit</Form.Button>
            </Form>
            <Header as="h2" dividing>
              Comments
            </Header>
            <Comment.Group style={{ 'font-size': 16 }}>
              {comments.map(comment => <PotholeComment comment={comment} key={comment.id} />)}
            </Comment.Group>
          </Grid.Column>
          <Grid.Column width={4} floated="right">
            <Header as="h2" dividing>
              Donators
            </Header>
            <List bulleted style={{ 'font-size': 16 }}>
              {donators.map(donator => <List.Item key={donator.full_name}>{donator.full_name}</List.Item>)}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
