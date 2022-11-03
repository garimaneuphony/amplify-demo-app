import { Amplify, Auth } from "aws-amplify";

import {
  Authenticator,
  useTheme,
  View,
  Image,
  Text,
  Heading,
  Button,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "./aws-exports";

import { I18n } from "aws-amplify";
import { translations, withAuthenticator } from "@aws-amplify/ui-react";
I18n.putVocabularies(translations);
// I18n.setLanguage("en");
Amplify.configure(awsconfig);

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] =
  awsconfig.oauth.redirectSignIn.split(",");

const [localRedirectSignOut, productionRedirectSignOut] =
  awsconfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

Auth.configure(updatedAwsConfig);

I18n.putVocabulariesForLanguage("en", {
  // SignIn: "Login", // Tab header
  // // "Sign in": "Log in", // Button label
  // "Sign in to your account": "Welcome Back!",
  // Username: "Enter your username", // Username label
  // Password: "Enter your password", // Password label
  "Forgot your password?": "Forgot Password",

  "Sign in": "Continue",
  // "Reset Password": "Forgot your password?",
  "Enter your username": "Username or Email",
  "Send code": "Reset my password bruh",
  "Back to Sign In": "Back to Login",
});

// export default function App() {
//   return (
//     <Authenticator
//       variation="modal"
//       loginMechanisms={["email"]}
//       signUpAttributes={["username", "email"]}
//       socialProviders={["apple", "google"]}
//       // hideSignUp={true}
//       // formFields={formFields}
//       // components={components}
//     >
//       {({ signOut, user }) => (
//         <main>
//           <h1>Hello {user.username}</h1>
//           <button onClick={signOut}>Sign out</button>
//         </main>
//       )}
//     </Authenticator>
//   );
// }

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Forgot Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const formFields = {
  signIn: {
    username: {
      labelHidden: false,
      label: "Email",
      placeholder: "name@work-email.com",
    },
    password: {
      labelHidden: false,
      label: "Password",
      placeholder: "Min. 8 characters",
    },
  },
  // signUp: {
  //   password: {
  //     labelHidden: false,
  //     label: "Password:",
  //     placeholder: "Enter your Password:",
  //     isRequired: false,
  //     order: 2,
  //   },
  //   confirm_password: {
  //     labelHidden: false,
  //     label: "Confirm Password:",
  //     order: 1,
  //   },
  // },
  forceNewPassword: {
    password: {
      labelHidden: false,
      placeholder: "Enter your Password:",
    },
  },
  resetPassword: {
    username: {
      labelHidden: false,
      placeholder: "Enter your email:",
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      labelHidden: false,
      placeholder: "Enter your Confirmation Code:",
      label: "New Label",
      isRequired: false,
    },
    confirm_password: {
      labelHidden: false,
      placeholder: "Enter your Password Please:",
    },
  },
  setupTOTP: {
    QR: {
      totpIssuer: "test issuer",
      totpUsername: "amplify_qr_test_user",
    },
    confirmation_code: {
      labelHidden: false,
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      labelHidden: false,
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
};

function App() {
  const services = {
    async handleSignIn(formData) {
      let { username, password } = formData;
      // console.log(username, password);
      // custom username
      username = username.toLowerCase();
      password = password.toLowerCase();
      // attributes.email = attributes.email.toLowerCase();
      return Auth.signIn({
        username,
        password,
        // attributes,
      });
    },
  };

  return (
    <Authenticator
      services={services}
      formFields={formFields}
      components={components}
      loginMechanisms={["email"]}
      socialProviders={["apple", "google"]}
      hideSignUp={true}
    >
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}

export default App;
// export default withAuthenticator(App);
