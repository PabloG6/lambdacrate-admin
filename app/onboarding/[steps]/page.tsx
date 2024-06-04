import GithubSetup from "../steps/github";
import StripeSetup from "../steps/stripe";

export default function Page(params: {steps: string[]}) {
    console.log(params);
    const steps = {'step-1': <StripeSetup ></StripeSetup>, 'step-2': <GithubSetup></GithubSetup>}
    const step = params.steps[0] 
    return <>Software Help</>
}

