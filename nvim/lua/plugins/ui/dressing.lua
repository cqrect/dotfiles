return {
	"stevearc/dressing.nvim",
	opts = {},
	config = function()
		require("dressing").setup({
			input = {
				enabled = true,
				mappings = {
					n = {
						["q"] = "Close",
					},
				},
			},
			select = {
				enabled = true,
			},
		})
	end,
}
