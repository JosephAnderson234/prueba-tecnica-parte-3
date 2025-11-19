
type EnvKey = 'NEXT_PUBLIC_API_URL';

const envsVarLoaded: Record<EnvKey, string> = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
}

//this approach is useful, due to acces directly to process.env in some environments like Vercel can reduse the performance

//and we can map more endpoints, so this make very easy to manage in microservices architectures

const loaderEnv = (key: EnvKey) => {
    return envsVarLoaded[key];
}


export default loaderEnv;