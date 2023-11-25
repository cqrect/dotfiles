return {
	"folke/neodev.nvim",
	opts = {},
	enabled = true,
	config = function()
		require("neodev").setup({
			library = {
				enabled = true,
				runtime = true,
				types = true,
				plugins = true,
			},
			setup_jsonls = true,
			lspconfig = true,
			pathStrict = true,
		})
	end,
}
