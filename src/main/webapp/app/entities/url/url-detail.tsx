import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './url.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUrlDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UrlDetail = (props: IUrlDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { urlEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="urlDetailsHeading">Url</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{urlEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{urlEntity.name}</dd>
          <dt>Pet</dt>
          <dd>{urlEntity.pet ? urlEntity.pet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/url" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/url/${urlEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ url }: IRootState) => ({
  urlEntity: url.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UrlDetail);
