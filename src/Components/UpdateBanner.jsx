import Dashboard from "./Dashboard";


const UpdateBanner = ({ bannerContent, setBannerContent, bannerVisible, setBannerVisible }) =>{

    return(<>
        <Dashboard
                  bannerContent={bannerContent}
                  setBannerContent={setBannerContent}
                  bannerVisible={bannerVisible}
                  setBannerVisible={setBannerVisible}
              />
        </>
    )
}
export default UpdateBanner;