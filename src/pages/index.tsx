import {GetServerSideProps} from 'next';
import {usePageQuery, PageDocument} from '../generated/graphql';
import {client, ssrCache} from '../lib/urql';

export default function Home() {
	const [{data}] = usePageQuery({
		variables: {
			slug: 'about',
		},
	});
	return (
		<div>
			<h1>{data?.page.title}</h1>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	await client.query(PageDocument, {slug: 'about'}).toPromise();

	return {
		props: {
			urqlState: ssrCache.extractData(),
		},
	};
};
