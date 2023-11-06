return {
	"lukas-reineke/indent-blankline.nvim",
	main = "ibl",
	config = function()
		require("ibl").setup({
			scope = { enabled = false, show_exact_scope = true },
			exclude = {
				filetypes = {
					"help",
					"trouble",
					"lazy",
					"mason",
					"notify",
				},
			},
		})
	end,
}
