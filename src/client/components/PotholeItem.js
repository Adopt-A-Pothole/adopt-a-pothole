import React from 'react';
import {
  Item,
  Image,
  Segment,
  Progress,
  Rating,
} from 'semantic-ui-react';

const PotholeItem = ({ pothole }) => {
  const progress = Math.floor((pothole.money_donated / pothole.fill_cost) * 100);
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Image src={pothole.image} avatar style={{ fontSize: 50 }} />
          <Item.Content>
            <Item.Header as="a">{pothole.title}</Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description style={{ fontSize: 16 }}>{pothole.description}</Item.Description>
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
    </Segment>
  );
};

export default PotholeItem;
