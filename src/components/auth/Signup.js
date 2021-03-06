import React, { useState } from 'react';
import axios from 'axios';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Flex, Heading, Link, VStack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';

const validate = (values) => {
    const errors = {};
    if (!values.userFirstName) {
        errors.userFirstName = 'Required';
    }

    if (!values.userSecondName) {
        errors.userSecondName = 'Required';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Required';
    } else if (!/^[6-9]\d{9}$/i.test(values.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone address';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password !== values.retypePassword) {
        errors.password = "Password doesn't match";
        errors.retypePassword = "Password doesn't match";
    }

    if (!values.retypePassword) {
        errors.retypePassword = 'Required';
    }

    return errors;
};

const Signup = () => {
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            userFirstName: '',
            userSecondName: '',
            phoneNumber: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        validate,
        onSubmit: (values) => {
            // eslint-disable-next-line no-unused-vars
            const { retypePassword, ...filteredValues } = values;
            setLoading(true);
            axios
                .post('/api/register', filteredValues)
                .then((res) => {
                    setLoading(false);
                    toast({
                        title: 'Success',
                        description: res.data.message,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    history.push('/login');
                })
                .catch((error) => {
                    setLoading(false);
                    toast({
                        title: 'Error',
                        description: error.response.data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    boxShadow="md"
                    p="6"
                    rounded="lg"
                    bg="white"
                    maxWidth="400px"
                >
                    <Heading size="md" mt="4" mb="8" textAlign="center">
                        Create account
                    </Heading>
                    <VStack spacing={4} align="stretch">
                        <Flex justifyContent="space-between">
                            <Box w="48%">
                                <FormLabel htmlFor="firstName">
                                    First Name
                                </FormLabel>
                                <Input
                                    id="firstName"
                                    name="userFirstName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.userFirstName}
                                    placeholder="First Name"
                                />
                                <span className="errors">
                                    {formik.errors.userFirstName ? (
                                        <div>{formik.errors.userFirstName}</div>
                                    ) : null}
                                </span>
                            </Box>
                            <Box w="48%">
                                <FormLabel htmlFor="firstName">
                                    Last Name
                                </FormLabel>
                                <Input
                                    id="lastname"
                                    name="userSecondName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.userSecondName}
                                    placeholder="Last Name"
                                />
                                <span className="errors">
                                    {formik.errors.userSecondName ? (
                                        <div>
                                            {formik.errors.userSecondName}
                                        </div>
                                    ) : null}
                                </span>
                            </Box>
                        </Flex>
                        <Box>
                            <FormLabel htmlFor="phoneNumber">
                                Phone No
                            </FormLabel>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="string"
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                placeholder="phone number"
                            />
                            <span className="errors">
                                {formik.errors.phoneNumber ? (
                                    <div>{formik.errors.phoneNumber}</div>
                                ) : null}
                            </span>
                        </Box>
                        <Box>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder="enter email"
                            />
                            <span className="errors">
                                {formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}
                            </span>
                        </Box>
                        <Box>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder="enter password"
                            />
                            <span className="errors">
                                {formik.errors.password ? (
                                    <div>{formik.errors.password}</div>
                                ) : null}
                            </span>
                        </Box>
                        <Box>
                            <FormLabel htmlFor="rePassword">
                                Retype password
                            </FormLabel>
                            <Input
                                id="rePassword"
                                name="retypePassword"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.retypePassword}
                                placeholder="retype password"
                            />
                            <span className="errors">
                                {formik.errors.retypePassword ? (
                                    <div>{formik.errors.retypePassword}</div>
                                ) : null}
                            </span>
                        </Box>
                        {/* <Link to="/login">Go Login</Link> */}
                        <span>
                            Already have an account?{' '}
                            <Link as={ReactLink} color="teal.500" to="/login">
                                Login
                            </Link>
                        </span>
                        <Button
                            colorScheme="teal"
                            size="md"
                            type="submit"
                            isLoading={loading}
                        >
                            Sign up
                        </Button>
                    </VStack>
                </Box>
            </form>
        </div>
    );
};

export default Signup;
