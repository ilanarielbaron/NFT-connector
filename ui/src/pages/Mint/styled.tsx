import styled from '@emotion/styled';

const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px',
};

export const device = {
	mobileS: `(min-width: ${size.mobileS})`,
	mobileM: `(min-width: ${size.mobileM})`,
	mobileL: `(min-width: ${size.mobileL})`,
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
};

export const PaperWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
`;

export const ContractAddress = styled.div`
	text-transform: uppercase;
`;

export const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PaperHeadWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const ImgWrapper = styled.div`
	width: 80%;
	position: relative;
`;

export const StyledImg = styled.img`
	object-fit: cover;
	width: 280px;
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;

	@media ${device.laptop} {
		flex-direction: row;
	}
`;

export const MintWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ButtonWrapper = styled.div`
	margin: 30px 0;
`;

export const MintActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const PaperFoot = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 2.5rem;
`;

export const Pricing = styled.div`
	border-top-width: 1px;
	border-bottom-width: 1px;
	padding-top: 1rem;
    padding-bottom: 1rem;
	width: 100%;
	margin-top: 4rem;
}
`;
