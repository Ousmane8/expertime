import React, {useEffect,useState, useCallback, useRef } from 'react';
import styled from "styled-components";
import '../index.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import UpdateIcon from '@material-ui/icons/Update';
import FilterIcon from '@material-ui/icons/Filter';
import CancelIcon from '@material-ui/icons/Cancel';
import FormGroup from '@material-ui/core/FormGroup';
import { Container, Row, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'reactstrap';
import { arr, getFilteredData } from "../services/getfilter";
import { arrr, getFilteredBrandData } from "../services/getfilter";
import { Select } from 'react-functional-select';
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { blue } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },

}));


function Home() {
  const classes = useStyles();
  const [data, setData] = useState(arr);
  const [BrandData] = useState(arrr);
  const [currentValue, setCurrentValue] = useState(null);
  const [currentOptions, setCurrentOptions] = useState(BrandData);
  const selectRef = useRef(null);
  const [filter, setFilter] = useState("");
  const [filterBrandData, setFilterBrandData] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedData, setSelectedData] = useState(arr & arrr);
  const [filteredData, setFilteredData] = useState(() =>
      getFilteredData(filter, data, )
    );
  useEffect(
    function syncFilteredData() {
      setFilteredData(getFilteredData(filter, data));
    },
    [filter, data]
  );
  const [filteredBrandData, setFilteredBrandData] = useState(() =>
      getFilteredBrandData(filter, BrandData )
    );
    useEffect(
        function syncFilteredBrandData() {
          setFilteredBrandData(getFilteredBrandData(filter, BrandData));
        },
        [filter, BrandData]
      );
  const getOptionValue = useCallback((option) => option.brandId, []);
  const getOptionLabel = useCallback((option) => option.name, []);
  const onOptionChange = useCallback((option) => {
    if (option != null) {
      setCurrentValue(option.name);
    } else {
      setCurrentValue(null);
    }
  }, []);
  const onKeyDown = useCallback((e) => {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === '13') {
      console.log(e);
      console.log(selectRef.current);

      // I would like to get the current inputted value here.
      const newOption = { brandId: currentOptions.length, name: '' };
      const nextOptions = [...currentOptions, newOption];
      setCurrentOptions(nextOptions)
    }
  }, [currentOptions]);
  const selectData = (request, modify) => {
    setSelectedData(request);
    (modify === 'Edit') ? setModalEdit(true) : setModalEdit(true);
  };
  const edit = () => {
    let newData = data;
    newData.forEach( (info) => {
      if(info.requestId === selectedData.requestId ) {
        info.name = selectedData.brand.name;
        info.campaignName = selectedData.campaignName;
        info.media = selectedData.media;
        info.decisionDeadline = selectedData.decisionDeadline;
      }
    });
    setData(newData);
    setModalEdit(false);
  };
  const handleChange= (e) => {
    const {name, value} = e.target;
    setSelectedData((prevState) => ({
      ...prevState,
        [name]: value,
    }));
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const [state, setState] = React.useState({
    COLLABORATION: false,
    NEW_PRODUCT_INNOVATION: true,
    PRINT: false,
    RADIO: false,
    SPONSORSHIP: false,
    WEBSITE: false,
    LABELING_PACKAGING: false,
    OOH: false,
    PROMOTIONS: false,
    SOCIAL_MEDIA: false,
    TVC_ONLINE_VIDEOS: false,
    OTHERS: false,
  });

  const { t } = useTranslation();
  const CO = t('modal_form.media_camp.name_media.1');
  const NPI = t('modal_form.media_camp.name_media.2');
  const PR = t('modal_form.media_camp.name_media.3');
  const RA = t('modal_form.media_camp.name_media.4');
  const SPO = t('modal_form.media_camp.name_media.5');
  const WE = t('modal_form.media_camp.name_media.6');
  const LP = t('modal_form.media_camp.name_media.7');
  const H = t('modal_form.media_camp.name_media.8');
  const PRO = t('modal_form.media_camp.name_media.9');
  const SM = t('modal_form.media_camp.name_media.10');
  const TOV = t('modal_form.media_camp.name_media.11');
  const OT = t('modal_form.media_camp.name_media.12');
  const {COLLABORATION, NEW_PRODUCT_INNOVATION, PRINT, RADIO, SPONSORSHIP, WEBSITE, LABELING_PACKAGING, OOH, PROMOTIONS, SOCIAL_MEDIA, TVC_ONLINE_VIDEOS, OTHERS} =  state;
  const error = [CO, NPI, PR, RA, SPO, WE, LP, H, PRO, SM, TOV, OT ].filter((v) => v).length !== 2;
  return(
      <>
          <Container>
            <StyleTitle>
              {t('titre_general')}
            </StyleTitle>
              <Row>
                <div className="col-1">
                  <StyleTextFilter >
                    {t('filtered.1')}
                  </StyleTextFilter>
                </div>
                <div className="col-2">
                  <Input
                    min="1"
                    max="10"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                  />
                </div>
                  <div className="col-2">
                    <Select
                      ref={selectRef}
                      options={currentOptions}
                      onOptionChange={onOptionChange}
                      getOptionValue={getOptionValue}
                      getOptionLabel={getOptionLabel}
                      onKeyDown={onKeyDown}
                      initialValue={currentValue}
                    />
                  </div>
                <StyleDivFilter className="col-2">
                  <Button
                    variant="contained"
                    color="primary"
                    value={filterBrandData}
                    onClick={e => setFilterBrandData(e.target.value)}
                    startIcon={<FilterIcon />}
                  >
                    {t('filtered.3')}
                  </Button>
                </StyleDivFilter>
              </Row>
              <Row>
                <div>
                <StyleDivTh>
                  <div className="col-2"> {t('table_titre.1')}</div>
                  <div className="col-4">{t('table_titre.2')}</div>
                  <div className="col-2">{t('table_titre.3')}</div>
                  <div className="col-2">{t('table_titre.4')}</div>
                  <div className="col-2">{t('table_titre.5')}</div>
                  <div className="col-1"/>
                </StyleDivTh>
                {filteredData.map((request, i) =>{
                  function statusList () {
                    let text, tooltipText;
                    if ((request.requestStatus.name) === "SUBMITTED"){
                      text = <SendIcon style={{ color: blue[500], fontSize: 40 }}/>
                      tooltipText= t('status.1')
                    }
                    else if ((request.requestStatus.name) === "DRAFT"){
                      text = <HourglassEmptyIcon style={{ color: grey[500], fontSize: 40 }}/>
                      tooltipText= t('status.2')
                    }
                    else if ((request.requestStatus.name) === "TO_REVIEW"){
                      text = <VisibilityIcon style={{ color: yellow[500], fontSize: 40 }}/>
                      tooltipText= t('status.3')

                    }
                    else if ((request.requestStatus.name) === "VALIDATED"){
                      text = <CheckCircleOutlineIcon style={{ color: green[500], fontSize: 40 }}/>
                      tooltipText= t('status.4')
                    }
                    else if ((request.requestStatus.name) === "REJECTED"){
                      text = <HighlightOffIcon style={{ color: red[500], fontSize: 40 }}/>
                      tooltipText= t('status.5')
                    }
                    else if ((request.requestStatus.name) === "TO_MODIFY"){
                      text = <EditIcon style={{ color: 212121[500], fontSize: 40 }}/>
                      tooltipText= t('status.6')
                    }
                    return <div>
                      <div>{text}</div>
                      <div>{tooltipText}</div>
                    </div>;

                  }
                  function typeList(){
                    let type;
                    if((request.advice) === true ){
                      type = <StyleDivColor1>{t('type.1')}</StyleDivColor1>
                    }
                    else{
                      type = <StyleDivColor2>{t('type.2')}</StyleDivColor2>
                    }
                    return type;
                  }
                  /*function formatDateAffichage (){
                    let dateAffichage = request.submittedDate;
                    new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit"
                    }).format(dateAffichage)

                  }*/
                  return(
                    <StyleDivTd key={i} onClick={() =>selectData(request, 'Edit')}>{" "}
                      <div className="col-2 " >{statusList()}</div>
                      <div className="col-4 cont" >
                        <StyleDivSeparator className="indicatorSeparator"/>
                          {request.campaignName}
                      </div>
                      <div className="col-2 cont" >
                        {typeList()}
                      </div>
                      <div className="col-2 cont" >
                        {request.brand.name}</div>
                      <div className="col-2 cont" >
                        {
                          //formatDateAffichage()}
                          request.submittedDate
                        }
                      </div>
                      <div className="col-1 " ><ArrowForwardIosIcon style={{ color: grey[400], fontSize: 50 }}/></div>
                    </StyleDivTd>
                  )})
                }
                </div>
              </Row>
            {/* ~~~~~~~ Edit Character ~~~~~~~ */}
            <Modal isOpen={modalEdit}  size="xl">
              <ModalHeader>
                <div><h2>{t('modal_form.name_modal')}</h2></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <StyleDivBrand>
                    <StyledTextCamp className="col-2">{t('modal_form.brand_camp')} </StyledTextCamp>
                    <div className="col-10">
                      <Select
                        onChange={handleChange}
                        ref={selectRef}
                        options={currentOptions}
                        getOptionValue={getOptionValue}
                        getOptionLabel={getOptionLabel}
                        onKeyDown={onKeyDown}
                        initialValue={currentValue}
                      />
                    </div>
                  </StyleDivBrand>
                </FormGroup>
                <FormGroup>
                  <StyleDivCampName>
                    <StyledTextCamp>{t('modal_form.name_camp')} </StyledTextCamp>
                    <div>
                      <Input
                        className="form-control"
                         name="campaignName"
                         type="text"
                         value={selectedData && selectedData.campaignName}
                         onChange={handleChange}
                      />
                    </div>
                  </StyleDivCampName>
                </FormGroup>
                <FormGroup>
                <StyleDivCampName>
                  <StyledTextCamp>{t('modal_form.media_campagne')} </StyledTextCamp>
                  <div>
                    <div className={classes.root}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                          <div className="col-12">
                            <div>
                              <FormControlLabel
                              control={<Checkbox checked={COLLABORATION} onChange={handleChange} name={t('modal_form.media_camp.name_media.1')} />}
                              label={t('modal_form.media_camp.label_media.1')}
                            />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={NEW_PRODUCT_INNOVATION} onChange={handleChange} name={t('modal_form.media_camp.name_media.2')} />}
                                label={t('modal_form.media_camp.label_media.2')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={PRINT} onChange={handleChange} name={t('modal_form.media_camp.name_media.3')} />}
                                label={t('modal_form.media_camp.label_media.3')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={RADIO} onChange={handleChange} name={t('modal_form.media_camp.name_media.4')} />}
                                label={t('modal_form.media_camp.label_media.4')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={SPONSORSHIP} onChange={handleChange} name={t('modal_form.media_camp.name_media.5')} />}
                                label={t('modal_form.media_camp.label_media.5')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={WEBSITE} onChange={handleChange} name={t('modal_form.media_camp.name_media.6')} />}
                                label={t('modal_form.media_camp.label_media.6')}
                              />
                            </div>
                          </div>
                        </FormGroup>
                      </FormControl>
                      <FormControl required error={error} component="fieldset" className={classes.formControl}>
                        <FormGroup>
                          <div className="col-12">
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={LABELING_PACKAGING} onChange={handleChange} name={t('modal_form.media_camp.name_media.7')} />}
                                label={t('modal_form.media_camp.label_media.7')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={OOH} onChange={handleChange} name={t('modal_form.media_camp.name_media.8')} />}
                                label={t('modal_form.media_camp.label_media.8')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={PROMOTIONS} onChange={handleChange} name={t('modal_form.media_camp.name_media.9')} />}
                                label={t('modal_form.media_camp.label_media.9')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={SOCIAL_MEDIA} onChange={handleChange} name={t('modal_form.media_camp.name_media.10')} />}
                                label={t('modal_form.media_camp.label_media.10')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={TVC_ONLINE_VIDEOS} onChange={handleChange} name={t('modal_form.media_camp.name_media.11')} />}
                                label={t('modal_form.media_camp.label_media.11')}
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                control={<Checkbox checked={OTHERS} onChange={handleChange} name={t('modal_form.media_camp.name_media.12')} />}
                                label={t('modal_form.media_camp.label_media.12')}
                              />
                            </div>
                          </div>
                        </FormGroup>
                      </FormControl>
                    </div>
                  </div>
                </StyleDivCampName>
                </FormGroup>
                <FormGroup>
                <StyleDivCampName>
                  <StyledTextCamp>{t('modal_form.decision_camp')}</StyledTextCamp>
                  <div className="col-10">
                    <Input className="form-control"
                           name="decisionDeadline"
                           type="date"
                           value={selectedData && selectedData.decisionDeadline}
                           onChange={handleChange}
                    />
                  </div>
                </StyleDivCampName>
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => edit()}
                  className={classes.button}
                  startIcon={<UpdateIcon />}
                >
                  {t('modal_form.button_modal_camp.1')}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setModalEdit(false)}
                  className={classes.button}
                  startIcon={<CancelIcon />}
                >
                  {t('modal_form.button_modal_camp.2')}
                </Button>
              </ModalFooter>
            </Modal>
          </Container>
        </>
    )
}
export default Home;

const StyleTitle = styled.h2`
margin-top: 4%;
margin-bottom: 4%;
color: #0b516a;
`;

const StyleTextFilter = styled.h4`
margin-top: 5%;
`;
const StyleDivTh = styled.div`
letter-spacing: 0.03em;
    font-weight:600;
    display: flex;
    padding:40px 60px;
`;
const StyleDivTd = styled.div`
background-color: #f2f9fe;
    border: 2px solid #e9eef2;
    border-radius: 10px;
    padding:40px 60px;
    justify-content: space-between;
    margin-bottom: 25px;
    display: flex;
    cursor: pointer;
`;
const StyleDivSeparator = styled.div`
width: 1px;
    margin: 0.5rem 0;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    box-sizing: border-box;
    background-color: #ced4da;
`;
const StyleDivFilter = styled.div`
margin-left: auto;
`;
const StyleDivColor1 = styled.div`
width: 50%;
color: white;
    background: #e02e73;
    margin: 0;
    text-align: center;
`;
const StyleDivColor2 = styled.div`
width: 50%;
color: white;
    background: #7388a6;
    margin: 0;
    text-align: center;
`;
const StyleDivBrand = styled.div`
display: flex;
margin-top: 5%;
margin-bottom: 5%;
`;
const StyleDivCampName = styled.div`
margin-bottom: 5%;
`;
const StyledTextCamp = styled.div`
font-size: 22px;
`;

