// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoaderIcon from '../components/ui/LoaderIcon';
import Warning from '../assets/images/figyelmezteto_tabla_zold.png';
import Finish from '../assets/images/haromszog_pipa_zold.png';
import authServices from '../services/authServices';

const ActivateForm = (props) => {
  const [error, setError] = useState(false);
  const [finished, setFinished] = useState(false);
  const [, setErrorMessages] = useState([]);

  const location = useLocation();
  const { code } = useParams();


  const { classes } = props;

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log('aktiváló kód: '+code);
        const response = await authServices.confirmUser({token:code});
        if (response.data.status === 'OK') {
          setFinished(true);
        } else {
          setErrorMessages(response.data.messages);
          setError(true);
        }
      } catch (e) {
        setErrorMessages(['Technikai hiba']);
        setError(true);
      }
    };

    if (code !== undefined) {
      fetch();
    } else {
      setErrorMessages(['Érvénytelen kód']);
      setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, location.pathname]);

  return (
    <>
      {error ? (
        <>
          <Grid
            container
            className={classes.warningField}
            alignItems="center"
            justify="center"
            style={{
              maxWidth: '650px',
              marginLeft: 'auto',
              marginRight: 'auto',
              height: '65%',
            }}>
            <Grid item xs={12} sm="auto" className="warningSign">
              <img src={Warning} alt="" />
            </Grid>
            <Grid item xs={12} sm className="warningText">
              <p
                style={{
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  fontSize: '14px',
                }}>
                {'Érvénytelen kód'}
              </p>
            </Grid>
          </Grid>
        </>
      ) :finished ? (
        <>
          <Grid
            container
            className={classes.warningField}
            alignItems="center"
            justify="center"
            style={{
              maxWidth: '650px',
              marginLeft: 'auto',
              marginRight: 'auto',
              height: '65%',
            }}>
            <Grid item xs={12} sm="auto" className="warningSign">
              <img src={Finish} alt="" />
            </Grid>
            <Grid item xs={12} sm className="warningText">
              <p
                style={{
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  fontSize: '14px',
                }}>
                {'Az aktiválás sikeres!'}
              </p>
            </Grid>
          </Grid>
        </>
      ) :  (
        <Container component="main" maxWidth="xs">
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
              <LoaderIcon />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

ActivateForm.propTypes = {
  classes: PropTypes.shape(),
};

ActivateForm.defaultProps = {
  classes: {},
};

export default ActivateForm;
