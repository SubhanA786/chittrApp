
import React, { Fragment } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'

const validationSchema = Yup.object().shape({
    given_name: Yup.string()
        .label('given_name')
        .required('First name required')
        .min(2, 'Must have at least 2 characters'),
    family_name: Yup.string()
        .label('family_name')
        .required('Family name required')
        .min(2, 'Must have at least 2 characters'),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    password: Yup.string()
        .label('Password')
        .required()
        .min(4, 'Password must have more than 4 characters '),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Both passwords do not match')
        .required('Confirm Password is required')
})

export default class Signup extends React.Component {
    goToLogin = () => this.props.navigation.navigate('Login')

    handleSubmit = values => {
        if (values.email.length > 0 && values.password.length > 0) {
            setTimeout(() => {
                return fetch('http://10.0.2.2:3333/api/v0.0.5/user',{
                method: 'POST',
            body: JSON.stringify({
                given_name: values.given_name,
                family_name: values.family_name,
                email: values.email,
                password: values.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            alert("User Added!");
            console.log(JSON.stringify({
                given_name: values.given_name,
                family_name: values.family_name,
                email: values.email,
                password: values.password
            }));
            this.props.navigation.navigate('Login');
        })
        .catch((error) => {
            console.error(error);
        });
        }, 3000)
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{
                        given_name: '',
                        family_name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={values => {
                        this.handleSubmit(values)
                    }}
                    validationSchema={validationSchema}>
                    {({
                          handleChange,
                          values,
                          handleSubmit,
                          errors,
                          isValid,
                          touched,
                          handleBlur,
                          isSubmitting
                      }) => (
                        <Fragment>
                            <FormInput
                                name='given_name'
                                value={values.given_name}
                                onChangeText={handleChange('given_name')}
                                placeholder='Enter your first name'
                                iconName='md-person'
                                iconColor='#2C384A'
                                onBlur={handleBlur('given_name')}
                                autoFocus
                            />
                            <ErrorMessage errorValue={touched.given_name && errors.given_name} />
                            <FormInput
                                name='family_name'
                                value={values.family_name}
                                onChangeText={handleChange('family_name')}
                                placeholder='Enter your surname/family name'
                                iconName='md-person'
                                iconColor='#2C384A'
                                onBlur={handleBlur('family_name')}
                                autoFocus
                            />
                            <ErrorMessage errorValue={touched.family_name && errors.family_name} />
                            <FormInput
                                name='email'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                placeholder='Enter email'
                                autoCapitalize='none'
                                iconName='ios-mail'
                                iconColor='#2C384A'
                                onBlur={handleBlur('email')}
                            />
                            <ErrorMessage errorValue={touched.email && errors.email} />
                            <FormInput
                                name='password'
                                value={values.password}
                                onChangeText={handleChange('password')}
                                placeholder='Enter password'
                                secureTextEntry
                                iconName='ios-lock'
                                iconColor='#2C384A'
                                onBlur={handleBlur('password')}
                            />
                            <ErrorMessage errorValue={touched.password && errors.password} />
                            <FormInput
                                name='password'
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                placeholder='Confirm password'
                                secureTextEntry
                                iconName='ios-lock'
                                iconColor='#2C384A'
                                onBlur={handleBlur('confirmPassword')}
                            />
                            <ErrorMessage
                                errorValue={touched.confirmPassword && errors.confirmPassword}
                            />
                            <View style={styles.buttonContainer}>
                                <FormButton
                                    buttonType='outline'
                                    onPress={handleSubmit}
                                    title='SIGNUP'
                                    buttonColor='#F57C00'
                                    disabled={!isValid || isSubmitting}
                                    loading={isSubmitting}
                                />
                            </View>
                        </Fragment>
                    )}
                </Formik>
                <Button
                    title='Have an account? Login'
                    onPress={this.goToLogin}
                    titleStyle={{
                        color: '#33CCFF'
                    }}
                    type='clear'
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        margin: 25
    }
})
