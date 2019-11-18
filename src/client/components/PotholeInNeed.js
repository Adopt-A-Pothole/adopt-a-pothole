import React from "react";
import {
  Card,
  Image,
  Container,
  Rating,
  Progress,
  Grid
} from "semantic-ui-react";

const PotholeInNeed = ({ pothole, donationForm, toggleDonation, handleDonationInput, handleDonation }) => {
  const progress = Math.floor(
    (pothole.money_donated / pothole.fill_cost) * 100
  );
  return (
    <div id="pothole-profile">
      <Container textAlign="center">
        <Card className="ui centered card">
          <Image src={pothole.image} avatar style={{ fontSize: 150 }} />
          <Card.Content>
            <Card.Header>{pothole.title}</Card.Header>
            <Card.Meta>
              <span className="date">{pothole.zip}</span>
            </Card.Meta>
            <Card.Description>{pothole.description}</Card.Description>
          </Card.Content>
          <Card.Content>
            <p>How bad is it?</p>
            <Rating
              defaultRating={0}
              rating={pothole.severity}
              maxRating={3}
              disabled
            />
          </Card.Content>
          <Card.Content extra>
            <button
              type="button"
              className="ui primary button"
              onClick={toggleDonation}
            >
              Donate
            </button>
            {donationForm ? (
              <div>
                <input
                  type="text"
                  placeholder="Donation ex. 10.50"
                  onChange={handleDonationInput}
                />
                <button type="button" onClick={handleDonation}>
                  Pay with Paypal
                </button>
              </div>
            ) : (
              <div />
            )}
          </Card.Content>
          <Card.Content>
            <p>Percent Funded: </p>
            <Progress percent={progress} progress indicating />
          </Card.Content>
        </Card>
      </Container>
    </div>
  );
};

export default PotholeInNeed;
