package main

import "fmt"

const (
	actionTypeAutomatic = "automatic"
	actionTypeButton    = "button"
)

// ConfigMessageAction are actions that can be taken from the welcome message
type ConfigMessageAction struct {
	// The action type of button or automatic
	ActionType string `json:"ActionType"`

	// The text on the button if a button type
	ActionDisplayName string `json:"ActionDisplayName"`

	// The action name that should be URL safe
	ActionName string `json:"ActionName"`

	// The message that's display after this action was successful
	ActionSuccessfulMessage []string `json:"ActionSuccessfulMessage"`

	// The names of the channels that a users should be added to
	ChannelsAddedTo []string `json:"ChannelsAddedTo"`
}

// ConfigMessage represents the message to send in channel
type ConfigMessage struct {
	// This message will fire when it matches the supplied team
	TeamName string `json:"TeamName"`

	// Actions that can be taken with this message
	Actions []*ConfigMessageAction `json:"Actions"`

	// The message to send.  This is a go template that can access any member in MessageTemplate
	Message []string `json:"Message"`

	// The message to send as a slack attachment.  This is a go template that can access any member in MessageTemplate
	AttachmentMessage []string `json:"AttachmentMessage"`

	// Number of seconds to wait before sending the message
	DelayInSeconds int `json:"DelayInSeconds"`

	// Whether or not to include guest users
	IncludeGuests bool `json:"IncludeGuests"`
}

// Configuration from config.json
type ServerConfig struct {
	ServerURL    string `json:"serverURL"`
	ClientID     string `json:"clientID"`
	ClientSecret string `json:"clientSecret"`
}

type externalConfig struct {
	ConfluenceConfig []ServerConfig `json:"tokens"`
}

type Configuration struct {
	externalConfig
}

// type ExistingConfig struct {
// 	Config Configuration `json:"ExistingConfigTable"`
// }

// List of the welcome messages from the configuration
func (p *Plugin) getWelcomeMessages() []*ConfigMessage {
	return p.welcomeMessages.Load().([]*ConfigMessage)
}

// OnConfigurationChange is invoked when configuration changes may have been made.
func (p *Plugin) OnConfigurationChange() error {
	c := externalConfig{}

	if err := p.API.LoadPluginConfiguration(&c); err != nil {
		p.API.LogError(err.Error())
		return err
	}

	fmt.Printf("\n welcomebot configuration %+v", c)

	p.updateConfig(func(conf *Configuration) {
		conf.externalConfig = c
	})

	fmt.Printf("\n welcomebot configuration after %+v", c.ConfluenceConfig)

	// p.welcomeMessages.Store(c.WelcomeMessages)

	return nil
}

func (p *Plugin) updateConfig(f func(conf *Configuration)) Configuration {
	p.confLock.Lock()
	defer p.confLock.Unlock()

	f(&p.conf)
	return p.conf
}
