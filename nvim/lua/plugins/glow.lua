return {
	"ellisonleao/glow.nvim",
	cmd = "Glow",
	keys = {
		{ "<leader>d", "<cmd>Glow ./README.md<CR>", desc = "Preview README.md" },
	},
	config = function()
		require("glow").setup({
			style = "dark",
			border = "",
		})
	end,
}
