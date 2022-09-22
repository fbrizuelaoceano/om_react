/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useContext } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { Form as FB } from 'react-bulma-components';
import { AppContext } from '../Provider/StateProvider';
import { sideItemOptions } from '../../../config/config';
import RadioButton from '../RadioButton';
import StepControl from '../StepControl';
import { delegateManager } from '../Hooks/useStepManager';

export function SelectCountryStep({
  countryOptions,
  currentStep,
  setCurrentStep
}) {
  const [state] = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      country: ''
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Seleccione un pais')
    }),
    onSubmit: (values) => {
      console.log('formik values', values);
    },
    onChange: (values) => {
      console.log('Change', values);
    }
  });

  return (
    <form
      autoComplete="off"
      id="pais-grid"
      className="grid-country"
      onSubmit={formik.handleSubmit}
    >
      {countryOptions.map(({ ...props }) => (
        <RadioButton
          {...props}
          name="country"
          key={props.idElement}
          formikHook={formik}
          onChange={formik.handleChange}
        />
      ))}
      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isValid}
      />
    </form>
  );
}

export function SelectPaymentMethodStep({
  paymentOptions,
  userFlow,
  currentStep,
  setCurrentStep
}) {
  const isoCountry = userFlow.stepOne.isoRef;
  const [state] = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      payment_method: ''
    },
    validationSchema: Yup.object({
      payment_method: Yup.string().required('Seleccione un metodo')
    }),
    onSubmit: (values) => {
      console.log('formik values', values);
    },
    onChange: (values) => {
      console.log('Change', values);
    }
  });

  return (
    <form
      autoComplete="off"
      id="metPago_grid"
      className="grid-payment_method"
      onSubmit={formik.handleSubmit}
    >
      {paymentOptions.map(
        ({ allowedCountries, ...props }) =>
          allowedCountries.includes(isoCountry) && (
            <RadioButton
              {...props}
              name="payment_method"
              showText={false}
              key={props.shortName}
              typeBtn="payment_method"
              formikHook={formik}
              formikValue={props.value}
              onChange={formik.handleChange}
            />
          ))}
      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isValid}
      />
    </form>
  );
}

export function SelectPaymentModeStep({ currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      med: '',
      mod: ''
    },
    validationSchema: Yup.object({
      med: Yup.string().required('Seleccione un metodo'),
      mod: Yup.string().required('Seleccione un metodo')
    }),
    onSubmit: (values) => {
      console.log('formik values', {values});
     /*  const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
      delegateManager(currentStepObject,values) */
    },
    onChange: (values) => {
      console.log('Change', {values});
      /* const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
      delegateManager(currentStepObject,values) */
    }
  });

  // console.log({form:formik})

  return (
    <form
      id="medModPago_grid"
      autoComplete='off'
      className="grid-med_mod_payment"
      onSubmit={formik.handleSubmit}
    >
      {state.paymentMethodOptions.map(({ ...props }) => {
        console.log({ props });
        return (
          <RadioButton
            {...props}
            key={props.idElement}
            formikHook={formik}
            formikValue={formik.values.med}
            onChange={formik.handleChange}
          />
        );
      })}

      <div className="is-divider doble" />

      {state.paymentModeOptions.map(({ ...props }) => (
        <RadioButton
          {...props}
          key={props.idElement}
          formikHook={formik}
          formikValue={formik.values.mod}
          onChange={formik.handleChange}
        />
      ))}

      <StepControl
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        state={state}
        sideItemOptions={sideItemOptions}
        validStep={formik.isValid}
      />
    </form>
  );
}

export function FormClientDataStep({ currentStep, setCurrentStep }) {
  const [state] = useContext(AppContext);
  const clientFormWithoutOptions = state.clientForm.filter(
    (input) => !input.options
  );
  const clientFormRadioField = state.clientForm.filter(
    (input) =>  input.options && typeof(input.options[0]) === 'string'
  );

  const formik = useFormik({
    initialValues: {
      numeroContrato: '',
      email: '',
      montoContrato: '',
      cuotas: '',
      montoMensual: '',
      tipoSuscripcion:''
    },
    validationSchema: Yup.object({
      numeroContrato: Yup.number().typeError('Numero de contrato debe ser un numero').positive('No se permite valores negativos').min(10, 'Ingrese un SO valido').required('Campo requerido'),
      email: Yup.string().email('Correo Invalido').required('Campo requerido'),
      montoContrato: Yup.number().typeError('Monto de contrato debe ser un numero').positive('No se permite valores negativos').required('Campo requerido'),
      cuotas: Yup.number().typeError('Cuotas debe ser un numero').positive('No se permite valores negativos').required('Campo requerido'),
      montoMensual: Yup.number().typeError('Numero de contrato debe ser un numero').positive('No se permite valores negativos').min(10, 'Ingrese un SO valido').required('Campo requerido'),
      tipoSuscripcion:Yup.string().required('Campo requerido')
    }),
    onSubmit: (values) => {
      console.log(values);
    },
    onChange: (values) =>{
      const [currentStepObject] = state.sideItemOptions.filter( options => options.status === 'current');
      delegateManager(currentStepObject,values)
    }
  });
console.log({formik})
  return (
      <Form
        autoComplete="off"
        style={{ width: '80%', margin: '0 auto' }}
        className="grid-client_form"
        onSubmit={formik.handleSubmit}
      >
      <div className='suscri_type'>
              {clientFormRadioField.map(input => (
                <Form.Field>
                  <label className='label'>{input.label}</label>
                  {input.options.map( option => (
                    <Radio
                      label={` ${ option}`}
                      name={input.idElement}
                      value={option}
                      checked={formik.values[input.idElement] === option}
                      onChange={formik.handleChange}
                      key={option}
                    />
                     ))}
                     {formik.errors[input.idElement] && (
                <p className='help is-danger'>{formik.errors[input.idElement]}</p>
              )}
                     </Form.Field>
           /*  <pre>{JSON.stringify(input, null, 2)}</pre> */
           
              ))}
              
      </div>
        {clientFormWithoutOptions.map((input) => (
          <FB.Field key={input.idElement} style={{marginBottom: '0.7rem'}}>
            <FB.Label>{input.label}</FB.Label>
            <FB.Control>
              <FB.Input
                placeholder={input.placeholder}
                className ={ formik.errors[input.idElement] && 'is-danger'}
                type="text"
                value={formik.values[input.idElement]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={input.idElement}
                id={input.idElement}
              />
              {formik.errors[input.idElement] && (
                <p className='help is-danger'>{formik.errors[input.idElement]}</p>
              )}
            </FB.Control>
          </FB.Field>
        ))}

        <StepControl
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          state={state}
          sideItemOptions={sideItemOptions}
          validStep={formik.isValid}
        />
      </Form>
  );
}
