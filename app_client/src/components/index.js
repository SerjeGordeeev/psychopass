export default wpApp =>{

	require('./base/app_view/appViewDir')(wpApp)
		require('./base/app_header/appHeaderDir')(wpApp)
		require('./base/app_footer/appFooterDir')(wpApp)
		require('./pages/mainLayoutDir')(wpApp)

}
