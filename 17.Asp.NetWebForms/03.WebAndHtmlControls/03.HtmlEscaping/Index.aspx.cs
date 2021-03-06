﻿namespace _03.HtmlEscaping
{
    using System;

    public partial class Index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ButtonDisplay_Click(object sender, EventArgs e)
        {
            string text = this.TextBoxInput.Text;

            // TextBox text does not need to be escaped
            this.TextBoxResult.Text = text;

            string escapedText = this.Server.HtmlEncode(text);
            this.LabelResult.Text = escapedText;
        }
    }
}